"use client";

import Link from "next/link";
import { FiFilter, FiGrid, FiShoppingBag } from "react-icons/fi";

export default function ShopPage() {
  const categories = [
    "Electronics",
    "Fashion",
    "Beauty",
    "Shoes",
    "Furniture",
    "Accessories",
  ];

  return (
    <section className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-6">

        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">
              Shop Products
            </h1>

            <p className="text-gray-500 mt-2">
              Discover thousands of premium products.
            </p>
          </div>

          <button className="flex items-center gap-2 bg-[#3BB77E] text-white px-5 py-3 rounded-xl shadow-lg hover:scale-105 duration-300">
            <FiFilter />
            Filters
          </button>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">

          <aside className="bg-white rounded-2xl shadow-lg p-6">

            <h2 className="font-bold text-xl mb-6">
              Categories
            </h2>

            {categories.map((item) => (
              <div
                key={item}
                className="py-3 border-b hover:text-[#3BB77E] cursor-pointer duration-300"
              >
                {item}
              </div>
            ))}

          </aside>

          <div className="lg:col-span-3">

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

              {[1,2,3,4,5,6].map((item)=>(
                <div
                  key={item}
                  className="bg-white rounded-2xl shadow-lg p-6 hover:-translate-y-2 duration-300"
                >
                  <div className="h-44 bg-gray-100 rounded-xl flex items-center justify-center">
                    <FiShoppingBag className="text-5xl text-[#3BB77E]" />
                  </div>

                  <h2 className="font-bold text-lg mt-5">
                    Product {item}
                  </h2>

                  <p className="text-gray-500 mt-2">
                    Premium quality product.
                  </p>

                  <div className="flex justify-between items-center mt-5">
                    <span className="text-2xl font-bold text-[#3BB77E]">
                      ₹999
                    </span>

                    <button className="bg-[#3BB77E] text-white px-4 py-2 rounded-lg">
                      Buy
                    </button>
                  </div>
                </div>
              ))}

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}