import { NextResponse } from "next/server";
import { getStreamerCollection } from "@/lib/db";
import { setSession } from "@/lib/session";

export async function POST(request) {
  try {
    const { username } = await request.json();
    if (!username || !username.trim()) {
      return NextResponse.json({ error: "Username is required." }, { status: 400 });
    }

    const cleanedUsername = username.trim().toLowerCase();
    if (!/^[a-zA-Z0-9_]{3,20}$/.test(cleanedUsername)) {
      return NextResponse.json({ error: "Username must be 3-20 alphanumeric characters or underscores." }, { status: 400 });
    }

    const streamerColl = await getStreamerCollection();
    let streamer = await streamerColl.findOne({ username: cleanedUsername });

    if (!streamer) {
      console.log(`Auto-registering streamer: ${cleanedUsername}`);
      streamer = {
        username: cleanedUsername,
        telegramId: "",
        telegramSession: "",
        groupId: "",
        alertConfig: {
          titleTemplate: "✨ New Donation ✨",
          footerTemplate: "Thank You So Much! 💖",
          primaryColor: "#ffb84d",
          secondaryColor: "#00e676",
          duration: 10,
          ttsEnabled: true,
          ttsRate: 0.95,
          ttsPitch: 1.0,
          fontFamily: "Outfit",
          soundUrl: "/uploads/sounds/sound.mp3",
          ttsTemplate: "{donator} donated {amount} through superchat.",
          alertTemplate: "{donator} donated {amount} through super chat!"
        }
      };
      await streamerColl.insertOne(streamer);
    }

    await setSession(cleanedUsername);
    return NextResponse.json({ success: true, username: cleanedUsername });
  } catch (err) {
    console.error("Login route error:", err);
    return NextResponse.json({ error: "Server error during login" }, { status: 500 });
  }
}
