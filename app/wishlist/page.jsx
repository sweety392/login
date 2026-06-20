"use client";
import { useWishlist } from "../context/wishlistContext";

export default function WishlistPage() {
  const{wishList, seWishList}=useWishlist();


  return (

    <div className="min-h-screen bg-gray-100 p-6">

      {/* Heading */}

      <h1 className="text-3xl font-bold mb-6">
        ❤️ My Wishlist
      </h1>


      {/* Products Grid */}
      {wishList.length===0?("your wishlist is empty",<p>Add some stuffs</p>):(

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
{wishList.map((item)=>(
        <div
        id={item.id}
          className="
          bg-white
          rounded-xl
          shadow-lg
          overflow-hidden
          "
        >

          {/* Image */}

          <img
            src={item.images?.[0]}
            alt={item.title}
            className="
            w-full
            h-52
            object-cover
            "
          />


          {/* Details */}

          <div className="p-4">

            <h2 className="text-xl font-semibold">

              {item.title}

            </h2>


            <p className="text-gray-500 mt-1">

              {item.brand}

            </p>


            <p className="text-green-600 font-bold text-xl mt-2">

              {item.price}

            </p>


            <span
              className="
              inline-block
              mt-3
              px-3
              py-1
              bg-gray-200
              rounded-full
              text-sm
              "
            >

             {item.category}
            </span>

          </div>

        </div>
))}

      </div>

)}

    </div>

  );

}