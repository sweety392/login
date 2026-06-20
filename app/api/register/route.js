import { NextResponse } from "next/server";
import User from "@/app/models/user";
import { connectDB } from "@/app/lib/db";
import bcryptjs from "bcryptjs";

export async function POST(request) {
  try {
    await connectDB();
    console.log(process.env.MONGODB_URI);

    const body = await request.json();

    const { username, email, password } = body;

    // Validation
    if (!username || !email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required",
        },
        { status: 400 }
      );
    }

    // Check existing user
    // const existingUser = await User.findOne({
    //   email,
    // });

    // if (existingUser) {
    //   return NextResponse.json(
    //     {
    //       success: false,
    //       message: "Email already exists",
    //     },
    //     { status: 400 }
    //   );
    // }

    // Create user
    const salt = await bcryptjs.genSalt(10);

const hashedPassword = await bcryptjs.hash(
  password,
  salt
);
    const newUser = await User.create({
      userId: `USR${Date.now()}`,
      username,
      email,
      password:hashedPassword,
    });

    return NextResponse.json(
      {
        success: true,
        message: "User registered successfully",
        data: newUser,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}