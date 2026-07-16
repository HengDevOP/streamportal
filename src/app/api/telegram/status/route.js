import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { getStreamerCollection } from "@/lib/db";
import { connectionStates } from "@/lib/telegramManager";

export async function GET() {
  const username = await getSession();
  if (!username) {
    return NextResponse.json({ error: "Unauthorized. Please log in first." }, { status: 401 });
  }

  const streamerColl = await getStreamerCollection();
  const user = await streamerColl.findOne({ username });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Dynamically check live active Client connection status
  const client = activeClients[username];
  let actualStatus = "DISCONNECTED";

  if (client) {
    // GramJS client.connected is the ground truth
    if (client.connected) {
      actualStatus = "CONNECTED";
    } else {
      actualStatus = "DISCONNECTED";
    }
  } else {
    // Fallback to DB status (Vercel serverless / cold start sync)
    actualStatus = user.telegramStatus || "DISCONNECTED";
  }

  // Update in-memory cache
  if (connectionStates[username]) {
    connectionStates[username].status = actualStatus;
  } else {
    connectionStates[username] = {
      status: actualStatus,
      error: "",
      groupId: user.groupId || ""
    };
  }

  // Update MongoDB status if mismatch detected
  if (user.telegramStatus !== actualStatus) {
    await streamerColl.updateOne(
      { username },
      { $set: { telegramStatus: actualStatus } }
    );
    console.log(`🔄 Synced database status for ${username} to: ${actualStatus}`);
  }

  return NextResponse.json({
    status: actualStatus,
    error: connectionStates[username]?.error || "",
    groupId: connectionStates[username]?.groupId || user.groupId || ""
  });
}
