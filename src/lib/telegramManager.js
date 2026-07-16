import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions";
import { NewMessage } from "telegram/events";
import { getStreamerCollection, getTransactionCollection, getPendingDonationCollection } from "./db";

const apiId = 32427800;
const apiHash = "8f8e70605256a4e08a81bd5e45481ceb";
const defaultGroupId = "-5105279786";

if (!global._telegramActiveClients) {
  global._telegramActiveClients = {};
}
if (!global._telegramConnectionStates) {
  global._telegramConnectionStates = {};
}
if (!global._telegramLastPreviews) {
  global._telegramLastPreviews = {};
}
if (!global._telegramPendingDonations) {
  global._telegramPendingDonations = [];
}
if (!global._telegramEventHandlers) {
  global._telegramEventHandlers = {};
}

const activeClients = global._telegramActiveClients;
const connectionStates = global._telegramConnectionStates;
const lastPreviews = global._telegramLastPreviews;
const pendingDonations = global._telegramPendingDonations;
const eventHandlers = global._telegramEventHandlers;

function cleanupPendingDonations() {
  const oneHourAgo = Date.now() - 60 * 60 * 1000;
  const kept = pendingDonations.filter(p => p.time > oneHourAgo);
  pendingDonations.length = 0;
  pendingDonations.push(...kept);
}

const KHR_TO_USD = 4000; // Exchange rate: 4000 ៛ = 1 $

function parseABA(text) {
  const amountMatch = text.match(/(៛|\$)\s?([\d,]+(\.\d+)?)/);
  const currency = amountMatch?.[1] || "";
  const amount = parseFloat(amountMatch?.[2]?.replace(/,/g, "") || "0");
  const name = text.match(/paid by (.+?) \(\*\d+\)/i)?.[1];
  const amountUSD = currency === '៛' ? amount / KHR_TO_USD : amount;
  return {
    name: name || "Unknown",
    amount,
    amountUSD: parseFloat(amountUSD.toFixed(4)),
    currency,
    raw: text,
    time: Date.now()
  };
}

export function setupTelegramListener(client, user) {
  const rawGroupId = (user.groupId || defaultGroupId).toString();
  // Normalize: strip -100 supergroup prefix and leading minus for comparison
  const cleanTargetId = rawGroupId.replace(/^-?100/, "").replace(/^-/, "");
  console.log(`Setting up Telegram listener for user: ${user.username}, Group ID: ${rawGroupId} (normalized: ${cleanTargetId})`);

  const handler = async (event) => {
    const msg = event.message;
    if (!msg || !msg.message) return;
    // Skip messages sent by ourselves
    if (msg.out) return;

    // Extract chat ID directly from peerId — works for all chat types
    // peerId can be PeerChannel, PeerChat, or PeerUser
    let chatIdRaw = null;
    try {
      const peer = msg.peerId;
      if (peer) {
        // PeerChannel (supergroups/channels) → channelId
        // PeerChat (basic groups) → chatId
        // PeerUser (DMs) → userId
        chatIdRaw = (peer.channelId || peer.chatId || peer.userId || '').toString();
      }
    } catch (e) {
      console.error("Error reading peerId:", e);
      return;
    }

    if (!chatIdRaw) return;

    const cleanChatId = chatIdRaw.replace(/^-?100/, "").replace(/^-/, "");

    console.log(`[DBG][${user.username}] msg chatId=${chatIdRaw} clean=${cleanChatId} target=${cleanTargetId}`);

    if (cleanChatId !== cleanTargetId) return;

    const text = msg.message;
    console.log(`📩 [Telegram MSG for ${user.username}]:`, text);

    if (
      text.includes("paid by") &&
      (text.includes("៛") || text.includes("$"))
    ) {
      const data = parseABA(text);

      // --- MongoDB-backed pending donation lookup (Vercel-safe) ---
      // In-memory pendingDonations won't work on Vercel because each
      // serverless Lambda instance has a separate memory space.
      const normalize = (s) => s.trim().toLowerCase().replace(/[^a-z0-9]/g, "");

      try {
        const pendingColl = await getPendingDonationCollection();

        // Find oldest matching pending donation for this streamer
        const allPending = await pendingColl
          .find({ username: user.username })
          .sort({ time: 1 })
          .toArray();

        const matchedPending = allPending.find(
          (p) => normalize(p.bankName) === normalize(data.name)
        );

        if (matchedPending) {
          data.message = matchedPending.message || "";
          data.streamer = matchedPending.username;
          // Delete the matched record so it's not reused for the next payment
          await pendingColl.deleteOne({ _id: matchedPending._id });
          console.log(`✅ Matched pending donation for name: "${data.name}" -> message: "${data.message}"`);
        } else {
          // No viewer message registered — fire a plain alert
          data.message = "";
          data.streamer = user.username;
          console.log(`📢 Unmatched donation from "${data.name}" — firing plain alert for ${user.username}`);
        }

        // Clean up stale pending donations older than 1 hour
        const oneHourAgo = Date.now() - 60 * 60 * 1000;
        await pendingColl.deleteMany({ username: user.username, time: { $lt: oneHourAgo } });

      } catch (lookupErr) {
        console.error("Error looking up pending donation from MongoDB:", lookupErr);
        data.message = "";
        data.streamer = user.username;
      }

      try {
        const transactionColl = await getTransactionCollection();
        await transactionColl.insertOne(data);

        const limit = 180 * 24 * 60 * 60 * 1000; // 180 days
        const cutoff = Date.now() - limit;
        if (Math.random() < 0.1) {
          await transactionColl.deleteMany({ time: { $lt: cutoff } });
        }

        console.log(`💰 Transaction stored for ${user.username} | ${data.name} | ${data.currency}${data.amount}`);
      } catch (err) {
        console.error("Error storing transaction:", err);
      }
    }
  };

  // If there's an existing handler, remove it first to prevent duplication
  if (eventHandlers[user.username]) {
    try {
      client.removeEventHandler(eventHandlers[user.username]);
    } catch (e) {
      console.warn("Could not remove old Telegram event handler:", e.message);
    }
  }

  eventHandlers[user.username] = handler;
  client.addEventHandler(handler, new NewMessage({}));
}

export async function initTelegramClients() {
  console.log("Checking saved user Telegram sessions to auto-connect...");
  try {
    const streamerColl = await getStreamerCollection();
    const users = await streamerColl.find().toArray();

    for (const user of users) {
      if (user.telegramSession && !activeClients[user.username]) {
        console.log(`Attempting auto-connect for user ${user.username}...`);
        try {
          const client = new TelegramClient(new StringSession(user.telegramSession), apiId, apiHash, {
            connectionRetries: 5,
          });

          activeClients[user.username] = client;
          connectionStates[user.username] = { status: "CONNECTING", error: "", groupId: user.groupId };
          await streamerColl.updateOne({ username: user.username }, { $set: { telegramStatus: "CONNECTING" } });

          await client.start({
            catchUp: true,
            onError: (err) => {
              console.error(`Auto-connect error for ${user.username}:`, err);
              connectionStates[user.username].status = "ERROR";
              connectionStates[user.username].error = err.message;
            }
          });

          connectionStates[user.username].status = "CONNECTED";
          const me = await client.getMe();
          user.telegramId = me.id.toString();
          await streamerColl.updateOne({ username: user.username }, { 
            $set: { 
              telegramId: user.telegramId,
              telegramStatus: "CONNECTED"
            } 
          });

          console.log(`✅ Telegram auto-connected successfully for ${user.username}!`);
          setupTelegramListener(client, user);
        } catch (e) {
          console.error(`❌ Telegram auto-connect failed for ${user.username}:`, e);
          connectionStates[user.username] = { status: "DISCONNECTED", error: e.message, groupId: user.groupId };
          await streamerColl.updateOne({ username: user.username }, { $set: { telegramStatus: "DISCONNECTED" } });
          if (activeClients[user.username]) {
            try {
              await activeClients[user.username].destroy();
            } catch (err) {}
            delete activeClients[user.username];
          }
        }
      }
    }
  } catch (err) {
    console.error("Failed to query streamers for auto-connect:", err);
  }
}

export async function startTelegramConnection(user, phoneNumber, newGroupId) {
  const username = user.username;
  connectionStates[username] = {
    status: "CONNECTING",
    error: "",
    groupId: newGroupId
  };

  const streamerColl = await getStreamerCollection();
  await streamerColl.updateOne({ username }, { $set: { telegramStatus: "CONNECTING" } });

  if (activeClients[username]) {
    try {
      await activeClients[username].destroy();
    } catch (e) {}
    delete activeClients[username];
  }

  const savedSession = user.telegramSession || "";

  try {
    const client = new TelegramClient(new StringSession(savedSession), apiId, apiHash, {
      connectionRetries: 5,
    });

    activeClients[username] = client;

    client.start({
      catchUp: true,
      phoneNumber: async () => phoneNumber,
      phoneCode: async () => {
        connectionStates[username].status = "NEED_CODE";
        await streamerColl.updateOne({ username }, { $set: { telegramStatus: "NEED_CODE" } });
        return new Promise((resolve) => {
          connectionStates[username].phoneCodeResolver = resolve;
        });
      },
      password: async () => {
        connectionStates[username].status = "NEED_PASSWORD";
        await streamerColl.updateOne({ username }, { $set: { telegramStatus: "NEED_PASSWORD" } });
        return new Promise((resolve) => {
          connectionStates[username].passwordResolver = resolve;
        });
      },
      onError: (err) => {
        console.error(`GramJS Client error for ${username}:`, err);
        connectionStates[username].status = "ERROR";
        connectionStates[username].error = err.message;
      }
    }).then(async () => {
      connectionStates[username].status = "CONNECTED";
      console.log(`✅ Telegram connected successfully for ${username}!`);
      
      const me = await client.getMe();
      user.telegramId = me.id.toString();
      // Save the session string immediately — this is what allows auto-reconnect
      // and must be cleared on disconnect
      user.telegramSession = client.session.save();

      await streamerColl.updateOne({ username }, { 
        $set: { 
          telegramId: user.telegramId, 
          telegramSession: user.telegramSession,  // persisted StringSession
          telegramStatus: "CONNECTED"
        } 
      });
      console.log(`💾 telegramSession saved to DB for ${username}`);

      setupTelegramListener(client, user);
    }).catch(async (err) => {
      connectionStates[username].status = "ERROR";
      connectionStates[username].error = err.message;
      console.error(`GramJS start promise failed for ${username}:`, err);
      await streamerColl.updateOne({ username }, { $set: { telegramStatus: "DISCONNECTED" } });
      if (activeClients[username]) {
        try {
          await activeClients[username].destroy();
        } catch (e) {}
        delete activeClients[username];
      }
    });
    
  } catch (err) {
    connectionStates[username].status = "ERROR";
    connectionStates[username].error = err.message;
    console.error(`GramJS instantiation error for ${username}:`, err);
    await streamerColl.updateOne({ username }, { $set: { telegramStatus: "DISCONNECTED" } });
    if (activeClients[username]) {
      try {
        await activeClients[username].destroy();
      } catch (e) {}
      delete activeClients[username];
    }
  }
}

export { activeClients, connectionStates, lastPreviews, pendingDonations };
