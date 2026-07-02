"use client";

import { FiTag } from "react-icons/fi";

export default function DealsPage() {

  return (
    <section className="bg-gradient-to-r from-green-100 to-white min-h-screen py-20">

      <div className="max-w-7xl mx-auto px-6">

        <div className="bg-white rounded-3xl shadow-2xl p-14 text-center">

          <div className="flex justify-center">
            <FiTag
              className="text-[#3BB77E]"
              size={80}
            />
          </div>

          <h1 className="text-5xl font-bold mt-8">
            Mega Deals
          </h1>

          <p className="text-gray-500 mt-5 text-lg">
            Save up to 70% on premium products.
          </p>

          <button className="mt-10 bg-[#3BB77E] text-white px-8 py-4 rounded-xl shadow-lg hover:scale-105 duration-300">
            Shop Now
          </button>

        </div>

      </div>

    </section>
  );
}