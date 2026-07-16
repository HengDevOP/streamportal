import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { getStreamerCollection } from "@/lib/db";
import { lastPreviews } from "@/lib/telegramManager";

export async function POST(request, { params }) {
  const username = await getSession();
  if (!username) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { username: paramUsername } = await params;
  const targetUsername = paramUsername.toLowerCase();

  if (username !== targetUsername) {
    return NextResponse.json({ error: "Forbidden. You can only preview your own overlay." }, { status: 403 });
  }

  try {
    const { name, amount, currency, message } = await request.json();
    lastPreviews[targetUsername] = {
      name: name || "Test Donor",
      amount: amount || 10,
      currency: currency || "$",
      message: message || "This is a preview alert test!",
      time: Date.now(),
      isPreview: true
    };

    console.log(`Triggered preview alert for ${targetUsername}:`, lastPreviews[targetUsername]);
    return NextResponse.json({ success: true, message: "Preview alert triggered successfully!" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
