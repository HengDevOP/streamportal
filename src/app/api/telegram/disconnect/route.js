import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { getStreamerCollection } from "@/lib/db";
import { activeClients, connectionStates } from "@/lib/telegramManager";

export async function POST() {
  const username = await getSession();
  if (!username) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const streamerColl = await getStreamerCollection();
  const user = await streamerColl.findOne({ username });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  if (activeClients[username]) {
    try {
      await activeClients[username].destroy();
    } catch (e) {
      console.error("Telegram shutdown error:", e);
    }
    delete activeClients[username];
  }
  connectionStates[username] = { status: "DISCONNECTED", error: "", groupId: "" };

  await streamerColl.updateOne({ username }, { 
    $set: { 
      telegramSession: "", 
      telegramId: "" 
    } 
  });

  return NextResponse.json({ success: true, message: "Telegram client disconnected." });
}
