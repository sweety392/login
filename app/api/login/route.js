import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import User from "@/app/models/user";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connectDB();

export async function POST(request) {

  try {

    const reqBody = await request.json();

    const {

      email,

      password

    } = reqBody;


    // User Find

    const user = await User.findOne({

      email

    });


    if (!user) {

      return NextResponse.json(

        {

          success: false,

          message: "User not found"

        },

        {

          status: 400

        }

      );

    }



    // Password Compare

    const validPassword =

      await bcryptjs.compare(

        password,

        user.password

      );



    if (!validPassword) {

      return NextResponse.json(

        {

          success: false,

          message: "Invalid Password"

        },

        {

          status: 400

        }

      );

    }



    // JWT Token

    const token = jwt.sign(

      {

        id: user._id,

        email: user.email,

        role: user.role

      },

      process.env.TOKEN_SECRET,

      {

        expiresIn: "1d"

      }

    );




    // Response

    const response = NextResponse.json(

      {

        success: true,

        message: "Login Successful",

        role: user.role,

        user: {

          id: user._id,

          username: user.username,

          email: user.email,

          role: user.role

        }

      }

    );




    // Cookie

    response.cookies.set(

      "token",

      token,

      {

        httpOnly: true,

        secure: process.env.NODE_ENV === "production",

        sameSite: "strict",

        maxAge: 60 * 60 * 24

      }

    );



    return response;


  }

  catch (error) {


    return NextResponse.json(

      {

        success: false,

        message: error.message

      },

      {

        status: 500

      }

    );

  }

}