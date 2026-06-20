import { NextResponse } from "next/server";
import User from "@/app/models/user";
import { connectDB } from "@/app/lib/db";
import bcryptjs from "bcryptjs";

export async function POST(request) {

  try {

    await connectDB();

    const {
      email,
      password
    } =
      await request.json();

    const user =
      await User.findOne({
        email
      });

    if (!user) {

      return NextResponse.json(
        {
          success: false,
          message:
            "User not found",
        },
        {
          status: 400,
        }
      );
    }

    const salt =
      await bcryptjs.genSalt(10);

    const hashedPassword =
      await bcryptjs.hash(
        password,
        salt
      );

    user.password =
      hashedPassword;

    user.otp = null;

    user.expiryOtp = null;

    await user.save();

    return NextResponse.json({
      success: true,
      message:
        "Password Reset Successful",
    });

  } catch (error) {

    return NextResponse.json(
      {
        success: false,
        message:
          error.message,
      },
      {
        status: 500,
      }
    );
  }
}