import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { getStreamerCollection } from "@/lib/db";
import fs from "fs";
import path from "path";

export async function POST(request) {
  const username = await getSession();
  if (!username) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("qrFile");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
    }

    const filename = file.name;
    const ext = path.extname(filename).toLowerCase();

    if (![".png", ".jpg", ".jpeg", ".webp"].includes(ext)) {
      return NextResponse.json({ error: "Only .png, .jpg, .jpeg, and .webp image formats are supported!" }, { status: 400 });
    }

    const byteLength = file.size;
    if (byteLength > 2 * 1024 * 1024) {
      return NextResponse.json({ error: "File size too large (max 2MB)." }, { status: 400 });
    }

    const streamerColl = await getStreamerCollection();
    const user = await streamerColl.findOne({ username });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const uploadDir = path.join(process.cwd(), "public", "uploads", "qrs");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const finalFilename = `${username}${ext}`;
    const filePath = path.join(uploadDir, finalFilename);
    fs.writeFileSync(filePath, buffer);

    const qrPath = `/uploads/qrs/${finalFilename}?cb=${Date.now()}`;
    const updatedConfig = {
      ...user.alertConfig,
      qrUrl: qrPath
    };
    await streamerColl.updateOne({ username }, { $set: { alertConfig: updatedConfig } });

    return NextResponse.json({ success: true, qrUrl: qrPath });
  } catch (err) {
    console.error("QR upload route error:", err);
    return NextResponse.json({ error: "Server error during QR upload" }, { status: 500 });
  }
}
