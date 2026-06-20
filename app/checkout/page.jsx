"use client"
import Script from "next/script";
import axios from "axios";
import {useCart} from "../context/CartContext"
import { useState } from "react";


export default function CheckoutPage() {

  const{cart,totalPrice}=useCart();
  const[formData,setFormData]=useState({name:"",state:""})



  const handleChange =(e)=>{
    setFormData({
      ...formData,[e.target.name]:e.target.value
    })

  }


 const handlePlaceOrder = async()=>{

try{

const res = await axios.post(

"/api/payment",

{

amount:totalPrice

}

)


const order = res.data.order;



const options={

key:

process.env

.NEXT_PUBLIC_RAZORPAY_KEY_ID,


amount:

order.amount,


currency:

order.currency,


name:

"My Store",


description:

"Order Payment",


order_id:

order.id,


handler:function(response){

console.log(response);


alert(

"Payment Successful"

)


},



prefill:{

name:

formData.name

},



theme:{

color:"#16a34a"

}

}



const razor =

new window.Razorpay(

options

)



razor.open();



}

catch(error){

console.log(error)

}

}



  return (

    <div className="min-h-screen bg-gray-100 py-10 px-5">

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">



        {/* LEFT SIDE */}


        <div className="lg:col-span-2">

          <div className="bg-white rounded-3xl shadow-lg p-8">


            <h1 className="text-4xl font-bold mb-2">

              Checkout

            </h1>


            <p className="text-gray-500 mb-10">

              Please enter your shipping details.

            </p>





            {/* Name */}


            <div className="mb-8">

              <label className="block text-gray-700 font-semibold mb-3">

                Full Name

              </label>



              <input

                type="text"

                name="name"

                value={formData.name}

                onChange={handleChange}

                placeholder="Enter your full name"

                className="

                w-full

                border

                border-gray-300

                rounded-2xl

                px-5

                py-4

                outline-none

                text-lg

                focus:border-green-500

                focus:ring-2

                focus:ring-green-100

                "

              />

            </div>





            {/* State */}


            <div>

              <label className="block text-gray-700 font-semibold mb-3">

                State

              </label>



              <input

                type="text"

                name="state"

                value={formData.state}

                onChange={handleChange}

                placeholder="Enter your state"

                className="

                w-full

                border

                border-gray-300

                rounded-2xl

                px-5

                py-4

                outline-none

                text-lg

                focus:border-green-500

                focus:ring-2

                focus:ring-green-100

                "

              />

            </div>



            {/* Security */}


            <div className="mt-10 bg-green-50 rounded-2xl p-5">

              <p className="text-green-700 font-medium">

                🔒 Your information is secure and encrypted.

              </p>

            </div>

          </div>

        </div>






        {/* RIGHT SIDE */}


        <div>

          <div className="bg-white rounded-3xl shadow-lg p-7 sticky top-5">


            <h2 className="text-3xl font-bold mb-8">

              Order Summary

            </h2>





            {

              cart.length === 0

              ?

              (

                <p className="text-gray-500">

                  No items in cart.

                </p>

              )

              :

              (

                <div className="space-y-6">

                  {

                    cart.map((item)=>(

                      <div

                        key={item._id}

                        className="flex gap-4"

                      >



                        <img

                          src={item.images?.[0]}

                          alt={item.title}

                          className="

                          w-20

                          h-20

                          rounded-xl

                          object-cover

                          "

                        />





                        <div className="flex-1">


                          <h3 className="font-semibold">

                            {item.title}

                          </h3>


                          <p className="text-sm text-gray-500 mt-1">

                            Qty :

                            {" "}

                            {item.quantity}

                          </p>


                          <p className="text-green-600 font-bold mt-2">

                            ₹

                            {

                              item.price *

                              item.quantity

                            }

                          </p>


                        </div>


                      </div>

                    ))

                  }

                </div>

              )

            }






            <hr className="my-8"/>





            <div className="flex justify-between mb-4">

              <span className="text-gray-600">

                Shipping

              </span>



              <span className="text-green-600 font-semibold">

                FREE

              </span>

            </div>





            <div className="flex justify-between mb-6">

              <span className="text-gray-600">

                Tax

              </span>



              <span>

                ₹ 0

              </span>

            </div>





            <hr className="mb-6"/>





            <div className="flex justify-between">

              <h2 className="text-2xl font-bold">

                Total

              </h2>



              <h2 className="text-2xl font-bold text-green-600">

                ₹ {totalPrice}

              </h2>

            </div>







            <button

              onClick={handlePlaceOrder}

              className="

              w-full

              mt-8

              py-4

              rounded-2xl

              bg-gradient-to-r

              from-green-500

              to-emerald-600

              text-white

              text-lg

              font-bold

              shadow-lg

              hover:scale-105

              active:scale-95

              transition-all

              duration-300

              "

            >

              Proceed To Payment

            </button>





            <p className="text-center text-gray-500 text-sm mt-5">

              Secure Checkout • SSL Protected

            </p>


          </div>

        </div>


      </div>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

    </div>
    

  );

}