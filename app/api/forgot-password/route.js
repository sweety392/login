import { NextResponse } from "next/server";
import User from "@/app/models/user";
import { connectDB } from "@/app/lib/db";
import nodemailer from "nodemailer";

export async function POST(request) {

  try {

    await connectDB();

    const { email } =
      await request.json();

    const user =
      await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 400 }
      );
    }

   const otp = Math.floor(
  100000 + Math.random() * 900000
).toString();

user.otp = otp;

user.expiryOtp = new Date(
  Date.now() + 10 * 60 * 1000
);

await user.save();

console.log("Saved OTP:", user.otp);
console.log(
  "Saved Expiry:",
  user.expiryOtp
);

    const transporter =
      nodemailer.createTransport({
        service: "gmail",

        auth: {
          user:
            process.env.EMAIL_USER,

          pass:
            process.env.EMAIL_PASS,
        },
      });

    await transporter.sendMail({
      from:
        process.env.EMAIL_USER,

      to: email,

      subject:
        "Password Reset OTP",

      text:
        `Your OTP is ${otp}`,
    });

    return NextResponse.json({
      success: true,
      message:
        "OTP sent successfully",
    });

  } catch (error) {

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}