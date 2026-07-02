"use client";

import {
  FiSmartphone,
  FiMonitor,
  FiWatch,
  FiCoffee,
  FiGift,
  FiHome,
} from "react-icons/fi";

export default function CategoriesPage() {

  const categories = [
    { name: "Electronics", icon: <FiMonitor size={40}/> },
    { name: "Mobiles", icon: <FiSmartphone size={40}/> },
    { name: "Home", icon: <FiHome size={40}/> },
    { name: "Watches", icon: <FiWatch size={40}/> },
    { name: "Kitchen", icon: <FiCoffee size={40}/> },
    { name: "Gifts", icon: <FiGift size={40}/> },
  ];

  return (
    <section className="bg-gray-50 min-h-screen py-16">

      <div className="max-w-7xl mx-auto px-6">

        <h1 className="text-4xl font-bold text-center mb-14">
          Shop By Categories
        </h1>

        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">

          {categories.map((item)=>(
            <div
              key={item.name}
              className="bg-white rounded-3xl shadow-lg p-10 text-center hover:-translate-y-3 duration-300"
            >
              <div className="text-[#3BB77E] flex justify-center mb-6">
                {item.icon}
              </div>

              <h2 className="font-bold text-xl">
                {item.name}
              </h2>
            </div>
          ))}

        </div>

      </div>

    </section>
  );
}