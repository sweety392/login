import { NextResponse } from "next/server";
import {connectDB} from "@/app/lib/db";
import Banner from "@/app/models/banner";
import cloudinary from "@/app/cloudinary";

export async function POST(request) {
  try {
    await connectDB();

    const formData = await request.formData();

    const title = formData.get("title");
    const subtitle = formData.get("subtitle");
    const buttonText = formData.get("buttonText");
    const buttonLink = formData.get("buttonLink");
    const image = formData.get("image");

    if (!title || !subtitle || !image) {
      return NextResponse.json(
        {
          success: false,
          message: "All required fields are mandatory",
        },
        { status: 400 }
      );
    }

    
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    
    const base64 = `data:${image.type};base64,${buffer.toString("base64")}`;

    
    const uploadResult = await cloudinary.uploader.upload(base64, {
      folder: "fashion-banner",
    });

    const banner = await Banner.create({
      title,
      subtitle,
      image: uploadResult.secure_url,
      buttonText,
      buttonLink,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Banner uploaded successfully",
        banner,
      },
      { status: 201 }
    );
  } 
  catch (error) {
  console.error("Banner Upload Error:", error);

  return NextResponse.json(
    {
      success: false,
      message: error.message,
    },
    { status: 500 }
  );
}
}
export async function GET() {
  try {

    await connectDB();

    const banners = await Banner.find({
      active: true,
    }).sort({ createdAt: -1 });

    return NextResponse.json(
      {
        success: true,
        banners,
      },
      {
        status: 200,
      }
    );

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch banners",
      },
      {
        status: 500,
      }
    );

  }
}