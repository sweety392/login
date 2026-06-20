"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import { useCart } from "@/app/context/CartContext";
import { useWishlist } from "./context/wishlistContext";

export default function HomePage() {

  const { addToCart } = useCart();

  const { wishList, addToWishlist } = useWishlist();

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(false);


  // Fetch Products

  const fetchProducts = async () => {

    try {

      setLoading(true);

      const res = await axios.get("/api/products");

      if (res.data.success) {

        setProducts(res.data.products);

      }

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {

    fetchProducts();

  }, []);



  return (

    <div className="min-h-screen bg-gray-100 p-6">

      {/* Heading */}

      <h1 className="text-3xl font-bold mb-6">

        🛍️ All Products

      </h1>


      {/* Loading */}

      {loading && (

        <p className="text-gray-600">

          Loading products...

        </p>

      )}


      {/* Products Grid */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {products.map((item) => (

          <div

            key={item._id}

            className="

            bg-white

            rounded-xl

            shadow

            hover:shadow-xl

            transition-all

            duration-300

            overflow-hidden

            relative

            "

          >

            {/* Wishlist Button */}

            <button

              onClick={() => addToWishlist(item)}

              className="

              absolute

              top-3

              right-3

              z-10

              text-2xl

              bg-white

              rounded-full

              w-10

              h-10

              flex

              items-center

              justify-center

              shadow-lg

              cursor-pointer

              hover:scale-110

              transition

              "

            >

              ❤️

            </button>



            {/* Product Image */}

            <img

              src={item.images?.[0]}

              alt={item.title}

              className="

              w-full

              h-52

              object-cover

              "

            />



            {/* Product Details */}

            <div className="p-4">

              <h2 className="text-lg font-semibold">

                {item.title}

              </h2>



              <p className="text-gray-500 text-sm mt-1">

                {item.brand}

              </p>



              <p className="text-green-600 font-bold text-xl mt-2">

                ₹ {item.price}

              </p>



              <span

                className="

                inline-block

                mt-3

                px-3

                py-1

                bg-gray-200

                rounded-full

                text-xs

                "

              >

                {item.category}

              </span>

            </div>



            {/* Add To Cart */}

            <button

              onClick={() => addToCart(item)}

              className="

              w-full

              py-3

              bg-green-500

              text-white

              font-semibold

              hover:bg-green-600

              transition

              cursor-pointer

              "

            >

              🛒 Add To Cart

            </button>


          </div>

        ))}

      </div>

    </div>

  );

}