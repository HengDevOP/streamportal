import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { getStreamerCollection } from "@/lib/db";

export async function GET() {
  const username = await getSession();
  if (!username) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const streamerColl = await getStreamerCollection();
  const user = await streamerColl.findOne({ username });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({
    username: user.username,
    telegramId: user.telegramId || "",
    alertConfig: user.alertConfig
  });
}

export async function POST(request) {
  const username = await getSession();
  if (!username) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { alertConfig } = await request.json();
    const streamerColl = await getStreamerCollection();
    const user = await streamerColl.findOne({ username });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (alertConfig) {
      const updatedConfig = {
        ...user.alertConfig,
        ...alertConfig
      };
      await streamerColl.updateOne({ username }, { $set: { alertConfig: updatedConfig } });
      return NextResponse.json({ success: true, alertConfig: updatedConfig });
    }

    return NextResponse.json({ error: "No config changes sent" }, { status: 400 });
  } catch (err) {
    console.error("Save settings error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
