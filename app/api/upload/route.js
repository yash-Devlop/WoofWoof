// app/api/upload/route.js
import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique filename
    const filename = `${Date.now()}-${file.name}`;
    const filePath = path.join(process.cwd(), "public/uploads", filename);

    // Save file to local /public/uploads
    await writeFile(filePath, buffer);

    // File will be accessible at http://localhost:3000/uploads/<filename>
    return NextResponse.json({
      url: `/uploads/${filename}`,
    });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
