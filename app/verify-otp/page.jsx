"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function VerifyOtpPage() {
  const router = useRouter();

 const[email,setEmail]=useState("");
 const[otp, setOtp] =useState("");
 const[loading, setLoading] =useState(false);
 const handleVerifyOtp = async (e)=>{
  e.preventDefault();
  if(!email || !otp){
    return;
  }
  

  try{
    setLoading(true);
    const response = await axios.post("/api/verify-otp",{email, otp})
    if(response.data.success){
      toast.success("verify otp successfully")
      router.push(`/reset-password?email=${email}`)
    }

    

  }catch(error){
    console.log(error)
    toast.error(error?.response?.data.message|| error?.message||"something went wrong");

  }finally{
    setLoading(false)
  }
 }


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">

        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Verify OTP
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Enter the OTP sent to your email
        </p>

        <form
          onSubmit={handleVerifyOtp}
          className="space-y-5"
        >

          {/* Email */}

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Email
            </label>

            <input
             type="email"
             value={email}
             onChange={(e)=>setEmail(e.target.value)}

              className="
                w-full
                border
                border-gray-300
                rounded-lg
                px-4
                py-3
                outline-none
                focus:border-[#3BB77E]
              "
            />
          </div>

          {/* OTP */}

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              OTP
            </label>

            <input
             type="text"
             value={otp}
             maxLength={6}
             onChange={(e)=>setOtp(e.target.value)}
              className="
                w-full
                border
                border-gray-300
                rounded-lg
                px-4
                py-3
                outline-none
                focus:border-[#3BB77E]
                tracking-[8px]
                text-center
                text-xl
                font-bold
              "
            />
          </div>

          {/* Verify Button */}

          <button
            type="submit"
            disabled={loading}
            
            className="
              w-full
              bg-[#3BB77E]
              text-white
              py-3
              rounded-lg
              font-semibold
              hover:bg-[#2ea76d]
              transition
              disabled:opacity-50
            "
          >{loading? "verifying...":"verify otp"}
          </button>

        </form>

      </div>

    </div>
  );
}