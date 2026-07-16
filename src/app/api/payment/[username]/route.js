import { NextResponse } from "next/server";
import { getTransactionCollection } from "@/lib/db";
import { lastPreviews } from "@/lib/telegramManager";

export const dynamic = "force-dynamic";

export async function GET(request, { params }) {
  try {
    const { username } = await params;
    const targetUsername = username.toLowerCase();

    // Accept optional ?since=<timestamp> to return all new transactions after that point
    const { searchParams } = new URL(request.url);
    const since = parseInt(searchParams.get("since") || "0", 10);

    const transactionColl = await getTransactionCollection();

    if (since > 0) {
      // Return ALL transactions newer than `since`, sorted oldest-first so overlay plays them in order
      const newDonations = await transactionColl
        .find({ streamer: targetUsername, time: { $gt: since } })
        .sort({ time: 1 })
        .toArray();

      // Also check if there is a newer preview to include
      const latestPreview = lastPreviews[targetUsername] || {};
      if (latestPreview.time && latestPreview.time > since) {
        newDonations.push(latestPreview);
        newDonations.sort((a, b) => a.time - b.time);
      }

      return NextResponse.json(newDonations);
    }

    // Legacy: no `since` param — return only the single latest (used for first-poll baseline)
    const latestReal = await transactionColl
      .find({ streamer: targetUsername })
      .sort({ time: -1 })
      .limit(1)
      .next();

    const latestPreview = lastPreviews[targetUsername];
    const realTime = latestReal?.time || 0;
    const previewTime = latestPreview?.time || 0;

    if (realTime === 0 && previewTime === 0) {
      // Eliminate browser-server clock skew by returning server's current timestamp as the baseline
      return NextResponse.json({ time: Date.now(), isBaselineOnly: true });
    }

    if (previewTime > realTime) {
      return NextResponse.json(latestPreview);
    }
    return NextResponse.json(latestReal);

  } catch (err) {
    console.error("Error fetching latest payment:", err);
    return NextResponse.json({ error: "Database query error" }, { status: 500 });
  }
}
