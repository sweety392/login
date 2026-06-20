"use client";

import { useCart } from "../context/CartContext";
import Link from "next/link";
export default function CartPage() {

  const {

    cart,

    removeCart,

    increaseQuantity,

    decreaseQuantity,

    totalPrice

  } = useCart();


  return (

    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-3xl font-bold mb-8">

        🛒 Shopping Cart

      </h1>


      {

        cart.length===0

        ?

        (

          <div className="bg-white p-10 rounded-2xl shadow text-center">

            <h2 className="text-2xl font-bold">

              Your Cart is Empty 😔

            </h2>

            <p className="text-gray-500 mt-3">

              Add products to your cart.

            </p>

          </div>

        )

        :

        (

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">


            {/* Left Side */}

            <div className="lg:col-span-2 space-y-5">

              {

                cart.map((item)=>(

                  <div

                    key={item._id}

                    className="bg-white rounded-2xl shadow-md p-5 flex gap-6"

                  >


                    {/* Image */}

                    <img

                      src={item.images?.[0]}

                      alt={item.title}

                      className="w-40 h-40 rounded-xl object-cover"

                    />


                    {/* Details */}

                    <div className="flex-1">


                      <h2 className="text-2xl font-semibold">

                        {item.title}

                      </h2>


                      <p className="text-gray-500 mt-1">

                        {item.brand}

                      </p>


                      <p className="text-green-600 text-2xl font-bold mt-3">

                        ₹ {item.price * item.quantity}

                      </p>



                      {/* Quantity */}

                      <div className="flex items-center gap-4 mt-5">


                        <button

                          onClick={()=>decreaseQuantity(item._id)}

                          className="w-10 h-10 rounded-full bg-gray-200 text-xl"

                        >

                          -

                        </button>



                        <span className="font-bold text-xl">

                          {item.quantity}

                        </span>



                        <button

                          onClick={()=>increaseQuantity(item._id)}

                          className="w-10 h-10 rounded-full bg-gray-200 text-xl"

                        >

                          +

                        </button>

                      </div>



                      {/* Remove */}

                      <button

                        onClick={()=>removeCart(item._id)}

                        className="mt-5 text-red-500 font-semibold rounded border"

                      >

                        Remove Item

                      </button>


                    </div>


                  </div>

                ))

              }


            </div>



            {/* Right Side */}


            <div>


              <div className="bg-white rounded-2xl shadow-md p-7 sticky top-5">


                <h2 className="text-2xl font-bold mb-6">

                  Order Summary

                </h2>



                <div className="flex justify-between mb-4">

                  <span>

                    Items

                  </span>


                  <span>

                    {cart.length}

                  </span>

                </div>



                <div className="flex justify-between mb-4">

                  <span>

                    Shipping

                  </span>


                  <span className="text-green-600">

                    FREE

                  </span>

                </div>



                <hr className="my-5"/>



                <div className="flex justify-between">


                  <h3 className="text-2xl font-bold">

                    Total

                  </h3>


                  <h3 className="text-2xl font-bold text-green-600">

                    ₹ {totalPrice}

                  </h3>


                </div>

<Link href="/checkout">

                <button

                  className="

                  w-full

                  mt-7

                  py-4

                  rounded-xl

                  bg-gradient-to-r

                  from-yellow-400

                  to-orange-500

                  text-white

                  font-bold

                  text-lg

                  shadow-lg

                  hover:scale-105

                  transition-all

                  duration-300

                  "

                >

                  Proceed To Checkout

                </button>
                </Link>



                <p className="text-center text-gray-500 text-sm mt-4">

                  Safe and Secure Checkout

                </p>


              </div>


            </div>


          </div>

        )

      }


    </div>

  );

}