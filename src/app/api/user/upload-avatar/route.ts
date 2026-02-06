import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export const config = {
  api: { bodyParser: { sizeLimit: "5mb" } },
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { file, oldPublicId } = body;

    if (!file) {
      return NextResponse.json({ message: "File is required" }, { status: 400 });
    }

    if (oldPublicId) {
      await cloudinary.uploader.destroy(oldPublicId, {
        resource_type: "image", 
      });
    }

    const uploaded = await cloudinary.uploader.upload(file, {
      folder: "avatars",
      transformation: [
        { width: 300, height: 300, crop: "fill" },
      ],
    });

    return NextResponse.json({ url: uploaded.secure_url, publicId: uploaded.public_id });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Upload failed" }, { status: 500 });
  }
}
