"use client";

import Sidebar from "@/app/components/admin/Sidebar";
import Header from "@/app/components/admin/Header";

export default function AdminLayout({ children }) {

  return (

    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}

      <Sidebar />



      {/* Right Side */}

      <div className="flex-1">

        {/* Header */}

        <Header />


        {/* Page Content */}

        <main className="p-6">

          {children}

        </main>

      </div>

    </div>

  );

}