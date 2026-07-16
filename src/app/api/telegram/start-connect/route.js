import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { getStreamerCollection } from "@/lib/db";
import { startTelegramConnection } from "@/lib/telegramManager";

export async function POST(request) {
  const username = await getSession();
  if (!username) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { phoneNumber, groupId } = await request.json();
    if (!phoneNumber) {
      return NextResponse.json({ error: "Phone number required" }, { status: 400 });
    }

    const streamerColl = await getStreamerCollection();
    const user = await streamerColl.findOne({ username });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    user.groupId = groupId;
    await streamerColl.updateOne({ username }, { $set: { groupId } });
    
    startTelegramConnection(user, phoneNumber, groupId);

    return NextResponse.json({ success: true, status: "CONNECTING" });
  } catch (err) {
    console.error("Telegram start-connect route error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
