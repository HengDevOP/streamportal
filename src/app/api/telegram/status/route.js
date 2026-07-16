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

  const state = connectionStates[username] || { 
    status: user.telegramStatus || "DISCONNECTED", 
    error: "", 
    groupId: user.groupId || "" 
  };

  return NextResponse.json({
    status: state.status,
    error: state.error,
    groupId: state.groupId || user.groupId || ""
  });
}
