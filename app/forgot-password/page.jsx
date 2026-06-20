"use client";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation"

export default function ForgotPasswordPage() {

  const[email, setEmail]=useState("");
  const[loading , setLoading]=useState(false)
  const router = useRouter();
  const handleSendOtp = async(e)=>{
    e.preventDefault();
    try{
      setLoading(true)
      const response = await axios.post("/api/forgot-password",{email})
      
        toast.success(response.data.success)
        router.push("/verify-otp")

      }

    catch(error){
      toast.error(error.response?.data?.message)|| "something went wrong"

    }finally{
      setLoading(false)
    }

  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">

        <h1 className="text-3xl font-bold text-center mb-2">

          Forgot Password

        </h1>

        <p className="text-center text-gray-500 mb-8">

          Enter your registered email

        </p>

        <form
          onSubmit={handleSendOtp}
          className="space-y-5"
        >

          <div>

            <label
              className="
              block
              mb-2
              text-sm
              font-medium
              text-gray-700
            "
            >
              Email
            </label>

            <input
              type="email"
             value={email}
             onChange={(e)=>setEmail(e.target.value)}
              placeholder="Enter email"
              className="
              w-full
              border
              border-gray-300
              rounded-lg
              px-4
              py-3
              outline-none
              focus:border-[#3bb77e]
            "
            />

          </div>

          <button
            type="submit"
            disabled={loading}
            className="
            w-full
            bg-[#3bb77e]
            text-white
            py-3
            rounded-lg
            font-semibold
            hover:bg-[#2ea76d]
            transition
          "
          >

            {loading ? "Loading" :"Send Otp"}

          </button>

        </form>

      </div>

    </div>
  );
}