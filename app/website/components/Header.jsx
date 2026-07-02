"use client";

import Link from "next/link";
import SearchBar from "@/app/website/components/SearchBar"
import { useCart } from "@/app/context/CartContext";
import { useWishlist } from "@/app/context/wishlistContext";

import {

Search,

Heart,

ShoppingCart,

User,

ChevronDown

}

from "lucide-react";


export default function Header(){
  const{cart,addToCart}=useCart();
  const{wishList, addToWishList}=useWishlist();

return(

<header className="shadow-md bg-white">

{/* Top Header */}

<div className="

max-w-7xl

mx-auto

px-6

py-4

flex

items-center

justify-between

gap-5

">

{/* Logo */}

<Link

href="/"

className="

text-3xl

font-bold

text-[#3BB77E]

"

>

ShopEase

</Link>



{/* Category */}

<div

className="

hidden

md:flex

items-center

gap-2

font-medium

cursor-pointer

"

>

All Categories

<ChevronDown size={18}/>

</div>



{/* Search */}

  <SearchBar/>






{/* Right Icons */}

<div

className="

flex

items-center

gap-6

"

>

{/* Wishlist */}

<Link href="/wishlist">

    <div className="flex gap-6">

      <div className="relative">

        whislist

        <span
          className="
          absolute
          -top-2
          -right-3
          bg-red-500
          text-white
          rounded-full
          w-5
          h-5
          text-xs
          flex
          items-center
          justify-center
          "
        >

          {wishList.length}

        </span>

      </div>

    </div>
    </Link>

  


{/* Cart */}
<Link href="/cart">
<div

className="

relative

flex

items-center

gap-2

cursor-pointer

"

>

<ShoppingCart size={22} />

<span 

className="hidden md:block"

>

Cart

</span>



<span

className="

absolute

-top-2

left-3

bg-[#3BB77E]

text-white

text-xs

rounded-full

w-5

h-5

flex

items-center

justify-center

"

>

{cart.length}

</span>

</div>
</Link>



{/* User */}
<Link href="/login">
<div

className="

flex

items-center

gap-2

cursor-pointer

"

>

<User size={22}/>

<span 

className="hidden md:block">

Account

</span>

</div>
</Link>

</div>

</div>



{/* Bottom Navbar */}

<div

className="

border-t

"

>

<div

className="

max-w-7xl

mx-auto

px-6

py-4

flex

items-center

gap-8

font-medium

text-gray-700

"

>

<Link href="/">Home</Link>

<Link href="/shop">

Shop

</Link>

<Link href="/category">

Categories

</Link>

<Link href="/deals">

Deals

</Link>

<Link href="/about">

About

</Link>

<Link href="/contact">

Contact

</Link>

</div>

</div>

</header>

)

}