import { NextResponse } from "next/server";
import User from "@/app/models/user";
import { connectDB } from "@/app/lib/db";

export async function GET() {
  return NextResponse.json({
    message: "API Working",
  });
}

export async function POST(request) {
  try {
    await connectDB();

    const { email, otp } =
      await request.json();

    console.log("Email:", email);
    console.log("Entered OTP:", otp);

    const user =
      await User.findOne({
        email,
      });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        {
          status: 400,
        }
      );
    }

    console.log("DB OTP:", user.otp);
    console.log(
      "DB Expiry:",
      user.expiryOtp
    );

    // OTP Check
    if (
      String(user.otp) !==
      String(otp)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid OTP",
        },
        {
          status: 400,
        }
      );
    }

    // Expiry Check
    if (
      !user.expiryOtp ||
      user.expiryOtp < Date.now()
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "OTP Expired",
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json({
      success: true,
      message: "OTP Verified",
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}