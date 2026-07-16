import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { getStreamerCollection } from "@/lib/db";
import { activeClients, setupTelegramListener } from "@/lib/telegramManager";

export async function POST(request) {
  const username = await getSession();
  if (!username) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { groupId } = await request.json();
    if (!groupId) {
      return NextResponse.json({ error: "Group ID is required" }, { status: 400 });
    }

    const streamerColl = await getStreamerCollection();
    const user = await streamerColl.findOne({ username });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Save Group ID to DB
    await streamerColl.updateOne({ username }, { $set: { groupId } });
    user.groupId = groupId;

    // Refresh listener for the active client in memory
    const client = activeClients[username];
    if (client) {
      try {
        // Clear all old event handlers to prevent duplication
        client.removeEventHandler();
      } catch (e) {
        console.warn("Could not remove old Telegram event handlers:", e.message);
      }
      setupTelegramListener(client, user);
    }

    return NextResponse.json({ success: true, status: "CONNECTED", groupId });
  } catch (err) {
    console.error("Telegram set-group error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
