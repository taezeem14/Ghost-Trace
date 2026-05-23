import { NextResponse } from 'next/server';
import { ExifTool } from 'exiftool-vendored';
import { writeFile, unlink } from 'fs/promises';
import { join } from 'path';
import { tmpdir } from 'os';
import crypto from 'crypto';

const exiftool = new ExifTool();

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: "File is required" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const tempFilePath = join(tmpdir(), `${crypto.randomUUID()}-${file.name}`);
    
    await writeFile(tempFilePath, buffer);

    try {
      const tags = await exiftool.read(tempFilePath);
      return NextResponse.json({ tags });
    } finally {
      // Clean up temp file
      await unlink(tempFilePath).catch(console.error);
    }
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Failed to process EXIF data" }, { status: 500 });
  }
}
