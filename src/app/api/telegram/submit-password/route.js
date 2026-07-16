import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { getStreamerCollection } from "@/lib/db";
import { connectionStates } from "@/lib/telegramManager";

export async function POST(request) {
  const username = await getSession();
  if (!username) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const streamerColl = await getStreamerCollection();
  const user = await streamerColl.findOne({ username });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  try {
    const { password } = await request.json();
    if (!password) {
      return NextResponse.json({ error: "Password required" }, { status: 400 });
    }

    const state = connectionStates[username];
    if (state && state.passwordResolver) {
      state.passwordResolver(password);
      state.passwordResolver = null;
      return NextResponse.json({ success: true, message: "Password submitted" });
    }
    return NextResponse.json({ error: "No password prompt pending" }, { status: 400 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
