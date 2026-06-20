"use client";
import {useRouter} from "next/navigation"

import {
  signIn
} from "next-auth/react";

import {
  FaGoogle,
  FaGithub,
  FaFacebook,
  FaApple
} from "react-icons/fa";

export default function SignInPage() {
  const router= useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-2xl shadow-xl w-[400px]">

        <h1 className="text-3xl font-bold text-center mb-6">
          Welcome
        </h1>

        <button
          onClick={() => signIn("google")}
          className="w-full flex items-center justify-center gap-3 border py-3 rounded-lg mb-3"
        >
          <FaGoogle />
          Continue with Google
        </button>

        <button
          onClick={() => signIn("github")}
          className="w-full flex items-center justify-center gap-3 border py-3 rounded-lg mb-3"
        >
          <FaGithub />
          Continue with GitHub
        </button>

        <button
          onClick={() => signIn("facebook")}
          className="w-full flex items-center justify-center gap-3 border py-3 rounded-lg mb-3"
        >
          <FaFacebook />
          Continue with Facebook
        </button>

        <button
          onClick={() => signIn("apple")}
          className="w-full flex items-center justify-center gap-3 border py-3 rounded-lg mb-5"
        >
          <FaApple />
          Continue with Apple
        </button>

        <div className="text-center text-gray-400 mb-5">
          OR
        </div>
        <div>

        <button onClick={()=>router.push("/login")}
          className="w-full bg-[#3BB77E] text-white py-3 rounded-lg"
        >
          Continue with Email
        </button>
        </div>
        <br></br>
        <div>
         <button onClick={()=>router.push("/register")}
          className="w-full bg-[#3BB77E] text-white py-3 rounded-lg"
        >
          Create your Account
        </button>
        </div>

      </div>

    </div>
  );
}