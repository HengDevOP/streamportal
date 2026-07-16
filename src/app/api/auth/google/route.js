import { NextResponse } from "next/server";
import { getStreamerCollection } from "@/lib/db";
import { setSession } from "@/lib/session";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri = "http://localhost:3000/api/auth/google";

  if (error) {
    console.error("Google OAuth error parameter:", error);
    return NextResponse.redirect(new URL("/?error=oauth_failed", request.url));
  }

  // Phase 1: Redirect user to Google
  if (!code) {
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=openid%20email%20profile`;
    return NextResponse.redirect(authUrl);
  }

  // Phase 2: Handle Google Redirect Callback
  try {
    // Exchange code for tokens
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });

    if (!tokenRes.ok) {
      const errorText = await tokenRes.text();
      console.error("Failed to exchange auth code:", errorText);
      return NextResponse.redirect(new URL("/?error=token_exchange_failed", request.url));
    }

    const { access_token } = await tokenRes.json();

    // Fetch user info
    const userRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    if (!userRes.ok) {
      console.error("Failed to fetch userinfo");
      return NextResponse.redirect(new URL("/?error=userinfo_failed", request.url));
    }

    const profile = await userRes.json();
    const email = profile.email;
    if (!email) {
      return NextResponse.redirect(new URL("/?error=no_email", request.url));
    }

    // Form username from email (e.g. sok.mean@gmail.com -> sok_mean)
    let username = email.split("@")[0].replace(/[^a-zA-Z0-9_]/g, "_").toLowerCase();
    if (username.length < 3) username = username + "_user";

    const streamerColl = await getStreamerCollection();
    let streamer = await streamerColl.findOne({ email });

    if (!streamer) {
      streamer = await streamerColl.findOne({ username });
    }

    // Create streamer record if not exists
    if (!streamer) {
      streamer = {
        username,
        email,
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
    } else {
      if (!streamer.email) {
        await streamerColl.updateOne({ username: streamer.username }, { $set: { email } });
      }
      username = streamer.username;
    }

    await setSession(username);
    return NextResponse.redirect(new URL("/", request.url));

  } catch (err) {
    console.error("OAuth Callback error:", err);
    return NextResponse.redirect(new URL("/?error=server_error", request.url));
  }
}
