import { NextResponse } from "next/server";
import { getStreamerCollection } from "@/lib/db";

export async function GET(request, { params }) {
  const { username } = await params;
  const targetUsername = username.toLowerCase();

  const streamerColl = await getStreamerCollection();
  const user = await streamerColl.findOne({ username: targetUsername });
  if (!user) {
    return NextResponse.json({ error: "Streamer not found" }, { status: 404 });
  }

  return NextResponse.json({
    username: user.username,
    alertConfig: user.alertConfig
  });
}
