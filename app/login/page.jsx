"use client";

import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import {useRouter} from "next/navigation"
import toast from "react-hot-toast";

export default function LoginPage() {
  const[email, setEmail]=useState("");
  const[password, setPassword] =useState("")
  const router =useRouter();
  const handleLogin = async(e)=>{
    e.preventDefault();
    try{
      const response = await axios.post("/api/login",{email,password})
      if(response.data.success){
        if(response.data.role==="admin"){
          router.push("/admin")
        }else{
        toast.success("login successful")
        router.push("/")
        }
      }

    }catch(error){
     console.log(error.response?.data);

    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Login
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Welcome back! Please login to your account.
        </p>

        <form className="space-y-5">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
            <input onChange={(e)=>setEmail(e.target.value)}
              type="email"
              value={email}
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#3bb77e]"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
            <input onChange={(e)=>setPassword(e.target.value)}
              type="password"
              value={password}
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#3bb77e]"
            />
          </div>

          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Remember me
            </label>

            <button onClick={()=>router.push("/forgot-password")}
              type="button"
              className="text-[#3bb77e] hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          <button onClick={handleLogin} 
            type="submit"
            className="w-full bg-[#3bb77e] text-white py-3 rounded-lg font-semibold hover:bg-[#2ea76d] transition"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?
          </p>

          <Link href="/register">
            <button className="
              mt-2
              text-[#3bb77e]
              font-semibold
              hover:underline
            ">
              Create Account
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
}