"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";


export default function ResetPassword() {

  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const[showPassword, setShowPassword]=useState(false);
  const[loading,setLoading]=useState(false);
  const router =useRouter();
  const handleResetButton = async()=>{
   
    try{
      
      if(!email || !password){
        toast.error("all fields are required")
        return;
      }
      if(password.length < 6){
        toast.error("maximum length of bpassword is 6")
        return;
      }
     setLoading(true)
      const response = await axios.post("/api/reset-password",{email,password})
      if(response.data.success){
        toast.success("password reset successfully")
        router.push("/login")
      }

    }catch(error){
      console.log(error)
      toast.error(error?.response?.data?.message|| error?.message || "something went wrong")

    }finally{
      setLoading(false)
    }
  }

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">

        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Reset Password
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Create a new secure password
        </p>

        {/* Email */}

        <div className="mb-5">

          <label className="block mb-2 text-sm font-medium text-gray-700">

            Email Address

          </label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}

            onChange={(e)=>

              setEmail(e.target.value)

            }

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

        {/* Password */}

        <div className="mb-6 relative">

          <label className="block mb-2 text-sm font-medium text-gray-700">

            New Password

          </label>

          <input

            type={

              showPassword

              ? "text"

              : "password"

            }

            placeholder="Enter new password"

            value={password}

            onChange={(e)=>

              setPassword(e.target.value)

            }

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

          <button

            type="button"

            onClick={()=>

              setShowPassword(
                !showPassword
              )

            }

            className="
            absolute
            right-4
            top-[44px]
            text-gray-500
            "

          >

            {

              showPassword

              ? <EyeOff size={20}/>

              : <Eye size={20}/>

            }

          </button>

        </div>

        {/* Button */}

        <button onClick={handleResetButton}

          className="
          w-full
          bg-[#3BB77E]
          text-white
          py-3
          rounded-lg
          font-semibold
          hover:bg-[#2fa56d]
          transition
          "

        >

          {loading ? "Resetting..." : "Reset"}

        </button>

      </div>

    </div>

  );
}