"use client";

import Link from "next/link";

const menuItems = [

  {
    name:"Dashboard",
    path:"/admin"
  },

  {
    name:"Products",
    path:"/admin/product"
  },

  {
    name:"Users",
    path:"/admin/users"
  },

  {
    name:"Orders",
    path:"/admin/orders"
  },
   {
    name: "Banner",
    path: "/admin/banner",  
  },

  {
    name:"Reports",
    path:"/admin/reports"
  }

];

export default function Sidebar(){

return(

<div className="w-64 bg-white shadow-md">

<div className="p-6 border-b">

<h1 className="text-2xl font-bold text-[#3BB77E]">

Admin Panel

</h1>

</div>


<div className="p-4">

{

menuItems.map((item)=>(

<Link

key={item.name}

href={item.path}

className="block p-3 rounded-lg hover:bg-gray-100 mb-2"

>

{item.name}

</Link>

))

}

</div>

</div>

)

}