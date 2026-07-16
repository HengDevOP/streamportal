import { NextResponse } from "next/server";
import { getStreamerCollection } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(request, { params }) {
  try {
    const { username } = await params;
    const targetUsername = username.toLowerCase();

    const streamerColl = await getStreamerCollection();
    const user = await streamerColl.findOne({ username: targetUsername });

    if (!user) {
      return NextResponse.json({ error: "Streamer not found" }, { status: 404 });
    }

    // Ensure there is always a qrUrl fallback even if the DB record is missing it
    const alertConfig = user.alertConfig || {};
    if (!alertConfig.qrUrl) {
      alertConfig.qrUrl = "/uploads/qrs/khqr.png";
    }

    return NextResponse.json({
      username: user.username,
      alertConfig,
    });
  } catch (err) {
    console.error("overlay/config error:", err.message);
    return NextResponse.json({ error: "Database connection error" }, { status: 500 });
  }
}
