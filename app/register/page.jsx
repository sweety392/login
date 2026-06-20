"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[showPassword , setShowPassword]=useState(false)
  const [confirmPaasword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Required Fields Validation
    if (!userName || !email || !password || !confirmPaasword) {
      toast.error("All fields are required");
      return;
    }

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email");
      return;
    }

    // Password Length Validation
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    // Confirm Password Validation
    if (password !== confirmPaasword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post("/api/register", {
        username: userName.trim(),
        email: email.trim(),
        password,
      });

      if (response.data.success) {
        toast.success("Registration Successful");

        // Clear Form
        setUserName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");

        // Redirect
        router.push("/login");
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error?.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Register
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Create your new account
        </p>

        <form onSubmit={handleRegister} className="space-y-5">
          {/* Username */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Username
            </label>

            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter username"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#3bb77e]"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#3bb77e]"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block mb-2 text-sm font-medium  text-gray-700">
              Password
            </label>

            <input
              type={showPassword ? "text" :"password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create password"
              className="w-full border  border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#3bb77e]"
            />
            <span className="absolute right-4 bottom-2.5 " onClick={()=>setShowPassword(!showPassword)}>
              {!showPassword ? <Eye/> :<EyeOff/>}

            </span>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block mb-2 text-sm font-medium relative text-gray-700 flex justify-between items-center">
              Confirm Password
            </label>

            <input
            type="password"
              
              value={confirmPaasword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#3bb77e]"
            />
           
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#3bb77e] text-white py-3 rounded-lg font-semibold hover:bg-[#2ea76d] transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "REGISTERING..." : "REGISTER"}
          </button>
        </form>

        {/* Login Link */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?
          </p>

          <button
            onClick={() => router.push("/login")}
            className="mt-2 text-[#3bb77e] font-semibold hover:underline"
          >
            Login here
          </button>
        </div>
      </div>
    </div>
  );
}