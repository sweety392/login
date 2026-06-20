"use client";

import Link from "next/link";
import {useRouter} from "next/navigation"
import { CircleUser } from "lucide-react";

import {
  Search,
  Heart,
  ShoppingCart,
  User,
  Menu,
} from "lucide-react";

export default function Header() {
  const router = useRouter();
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#3BB77E] flex items-center justify-center text-white font-bold text-xl">
            S
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              ShopVerse
            </h1>

            <p className="text-xs text-slate-500">
              Premium Shopping
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="hidden lg:flex w-[500px] relative">
          <input
            type="text"
            placeholder="Search products..."
            className="
              w-full
              h-12
              rounded-full
              border
              border-slate-300
              px-5
              pr-14
              outline-none
              focus:border-[#3BB77E]
            "
          />

          <button
            className="
              absolute
              right-2
              top-1/2
              -translate-y-1/2
              bg-[#3BB77E]
              p-2.5
              rounded-full
              text-white
            "
          >
            <Search size={18} />
          </button>
        </div>

        {/* Menu */}
        <nav className="hidden lg:flex items-center gap-8">
          <Link href="/" className="font-medium">
            Home
          </Link>

          <Link href="/website/shop" className="font-medium">
            Shop
          </Link>

          <Link href="/categories" className="font-medium">
            Categories
          </Link>

          <Link href="/website/contact" className="font-medium">
            Contact
          </Link>
        </nav>

        {/* Right */}
        <div className="flex items-center gap-4">

          <button className="relative">
            <Heart size={24} />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              2
            </span>
          </button>

          <button className="relative">
            <ShoppingCart size={24} />
            <span className="absolute -top-2 -right-2 bg-[#3BB77E] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              4
            </span>
          </button>
          <Link href="/auth/signin">
          <button 
         
            className="
              bg-[#3BB77E]
              text-white
              px-5
              py-2.5
              rounded-full
              flex
              items-center
              gap-2
            "
          >
            <CircleUser
    size={32}
    className="cursor-pointer"
  />
          
          </button>
          </Link>
          
          

          <button className="lg:hidden">
            <Menu />
          </button>

        </div>
      </div>
    </header>
  );
}