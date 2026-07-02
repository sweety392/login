"use client";

import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaApplePay,
} from "react-icons/fa";

import {
  MdEmail,
  MdLocationOn,
  MdPhone,
} from "react-icons/md";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-slate-950 via-gray-900 to-black text-white mt-20">

      {/* Top */}
      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">

          {/* Company */}
          <div>

            <h2 className="text-3xl font-extrabold mb-5">
              Shop<span className="text-green-400">EASE</span>
            </h2>

            <p className="text-gray-400 leading-8">

              Premium shopping experience with quality products,
              secure payments and lightning fast delivery.

            </p>

            <div className="mt-8 space-y-4">

              <div className="flex items-center gap-3">

                <MdLocationOn className="text-green-400 text-2xl"/>

                <p className="text-gray-400">
                  New Delhi, India
                </p>

              </div>

              <div className="flex items-center gap-3">

                <MdEmail className="text-green-400 text-2xl"/>

                <p className="text-gray-400">
                  support@shopsphere.com
                </p>

              </div>

              <div className="flex items-center gap-3">

                <MdPhone className="text-green-400 text-2xl"/>

                <p className="text-gray-400">
                  +91 98765 43210
                </p>

              </div>

            </div>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="text-xl font-bold mb-6">
              Quick Links
            </h3>

            <ul className="space-y-4">

              <li>
                <Link href="/" className="hover:text-green-400 duration-300">
                  Home
                </Link>
              </li>

              <li>
                <Link href="/products" className="hover:text-green-400 duration-300">
                  Products
                </Link>
              </li>

              <li>
                <Link href="/wishlist" className="hover:text-green-400 duration-300">
                  Wishlist
                </Link>
              </li>

              <li>
                <Link href="/cart" className="hover:text-green-400 duration-300">
                  Cart
                </Link>
              </li>

              <li>
                <Link href="/contact" className="hover:text-green-400 duration-300">
                  Contact
                </Link>
              </li>

            </ul>

          </div>

          {/* Customer */}

          <div>

            <h3 className="text-xl font-bold mb-6">
              Customer Support
            </h3>

            <ul className="space-y-4">

              <li>
                <Link href="#" className="hover:text-green-400 duration-300">
                  FAQs
                </Link>
              </li>

              <li>
                <Link href="#" className="hover:text-green-400 duration-300">
                  Shipping
                </Link>
              </li>

              <li>
                <Link href="#" className="hover:text-green-400 duration-300">
                  Return Policy
                </Link>
              </li>

              <li>
                <Link href="#" className="hover:text-green-400 duration-300">
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link href="#" className="hover:text-green-400 duration-300">
                  Terms & Conditions
                </Link>
              </li>

            </ul>

          </div>

          {/* Newsletter */}

          <div>

            <h3 className="text-xl font-bold mb-6">
              Newsletter
            </h3>

            <p className="text-gray-400 mb-6">

              Subscribe to get updates about new arrivals and offers.

            </p>

            <div className="flex">

              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-3 rounded-l-xl bg-white text-black outline-none"
              />

              <button className="bg-green-500 px-6 rounded-r-xl hover:bg-green-600 duration-300">
                Join
              </button>

            </div>

            {/* Social */}

            <div className="flex gap-4 mt-8">

              {[

                FaFacebookF,
                FaInstagram,
                FaTwitter,
                FaLinkedinIn,
                FaYoutube

              ].map((Icon,index)=>(

                <div
                  key={index}
                  className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-green-500 hover:-translate-y-2 duration-300 cursor-pointer"
                >

                  <Icon size={20}/>

                </div>

              ))}

            </div>

          </div>

        </div>

      </div>

      {/* Payment */}

      <div className="border-t border-gray-700">

        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col lg:flex-row justify-between items-center gap-6">

          <p className="text-gray-400 text-center">

            © 2026 ShopSphere. All Rights Reserved.

          </p>

          <div className="flex gap-5 text-4xl">

            <FaCcVisa className="hover:text-blue-500 duration-300"/>

            <FaCcMastercard className="hover:text-red-500 duration-300"/>

            <FaCcPaypal className="hover:text-cyan-400 duration-300"/>

            <FaApplePay className="hover:text-white duration-300"/>

          </div>

        </div>

      </div>

    </footer>
  );
}