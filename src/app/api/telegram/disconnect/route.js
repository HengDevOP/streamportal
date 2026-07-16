import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { getStreamerCollection } from "@/lib/db";
import { activeClients, connectionStates } from "@/lib/telegramManager";

export async function POST() {
  const username = await getSession();
  if (!username) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // 1. Destroy in-memory client if it exists (local dev / long-running instances)
    if (activeClients[username]) {
      try {
        await activeClients[username].disconnect();
      } catch (e) {
        console.warn("Telegram disconnect warning:", e.message);
      }
      try {
        await activeClients[username].destroy();
      } catch (e) {
        console.warn("Telegram destroy warning:", e.message);
      }
      delete activeClients[username];
    }

    // 2. Clear in-memory connection state
    connectionStates[username] = { status: "DISCONNECTED", error: "", groupId: "" };

    // 3. Wipe ALL Telegram session data from MongoDB
    //    This is the critical step for Vercel: even if no in-memory client exists,
    //    clearing telegramSession prevents auto-reconnect on next cold start.
    const streamerColl = await getStreamerCollection();
    await streamerColl.updateOne(
      { username },
      {
        $set: {
          telegramSession: "",   // Destroys the saved StringSession — cannot reconnect without re-auth
          telegramId: "",
          telegramStatus: "DISCONNECTED",
          groupId: "",
        }
      }
    );

    console.log(`✅ Telegram fully disconnected and session wiped for ${username}`);
    return NextResponse.json({ success: true, message: "Telegram client disconnected and session destroyed." });

  } catch (err) {
    console.error("Disconnect error:", err);
    return NextResponse.json({ error: "Failed to disconnect cleanly" }, { status: 500 });
  }
}
