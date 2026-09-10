import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { generateId } from '@/lib/utils';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      // Check if base64 data string was sent instead
      const base64Data = formData.get('base64') as string | null;
      if (base64Data) {
        const matches = base64Data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        if (!matches || matches.length !== 3) {
          return NextResponse.json({ success: false, error: 'Invalid base64 image payload' }, { status: 400 });
        }
        
        const mimeType = matches[1];
        const ext = mimeType.split('/')[1] || 'jpg';
        const buffer = Buffer.from(matches[2], 'base64');
        const filename = `clothing_${Date.now()}_${generateId()}.${ext}`;
        const uploadDir = path.join(process.cwd(), 'public', 'uploads');
        const filePath = path.join(uploadDir, filename);

        await writeFile(filePath, buffer);
        const imageUrl = `/uploads/${filename}`;

        return NextResponse.json({
          success: true,
          imageUrl,
          filename,
          size: buffer.length,
          mimeType,
          message: 'Image uploaded successfully via Base64 payload'
        });
      }

      return NextResponse.json({ success: false, error: 'No image file or base64 data provided' }, { status: 400 });
    }

    // File validation
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Max 10MB limit check
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ success: false, error: 'File size exceeds maximum 10MB limit' }, { status: 400 });
    }

    const fileExt = path.extname(file.name) || '.jpg';
    const filename = `clothing_${Date.now()}_${generateId()}${fileExt}`;
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    const filePath = path.join(uploadDir, filename);

    // Save to disk
    await writeFile(filePath, buffer);

    const imageUrl = `/uploads/${filename}`;

    return NextResponse.json({
      success: true,
      imageUrl,
      filename,
      size: file.size,
      mimeType: file.type,
      message: 'Image uploaded successfully to backend filesystem'
    });

  } catch (error: any) {
    console.error('Backend image upload error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to upload image' },
      { status: 500 }
    );
  }
}
