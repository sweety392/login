"use client";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function AddProductPage() {

  const [formData, setFormData] = useState({

    title: "",

    description: "",

    brand: "",

    category: "",

    price: "",

    stock: "",

    images: []

  });


  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({

      ...formData,

      [name]: value

    });

  };



  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(

        "/api/products",

        formData

      );


      if (response.data.success) {

        toast.success(

          "Product Added Successfully"

        );


        setFormData({

          title: "",

          description: "",

          brand: "",

          category: "",

          price: "",

          stock: "",

          images: []

        });

      }

    }

    catch (error) {

      toast.error(

        error?.response?.data?.message ||

        error?.message ||

        "Something went wrong"

      );

    }

  };



  return (

    <div className="max-w-3xl mx-auto">

      <div className="bg-white p-8 rounded-xl shadow">

        <h1 className="

        text-3xl

        font-bold

        mb-8

        ">

          Add Product

        </h1>



        <form

          onSubmit={handleSubmit}

          className="space-y-5"

        >

          {/* Title */}

          <input

            type="text"

            name="title"

            placeholder="Product Title"

            value={formData.title}

            onChange={handleChange}

            className="

            w-full

            border

            p-3

            rounded-lg

            outline-none

            "

          />



          {/* Description */}

          <textarea

            name="description"

            placeholder="Description"

            value={formData.description}

            onChange={handleChange}

            rows={5}

            className="

            w-full

            border

            p-3

            rounded-lg

            outline-none

            "

          />



          {/* Brand */}

          <input

            type="text"

            name="brand"

            placeholder="Brand"

            value={formData.brand}

            onChange={handleChange}

            className="

            w-full

            border

            p-3

            rounded-lg

            outline-none

            "

          />



          {/* Category */}

          <input

            type="text"

            name="category"

            placeholder="Category"

            value={formData.category}

            onChange={handleChange}

            className="

            w-full

            border

            p-3

            rounded-lg

            outline-none

            "

          />



          {/* Price */}

          <input

            type="number"

            name="price"

            placeholder="Price"

            value={formData.price}

            onChange={handleChange}

            className="

            w-full

            border

            p-3

            rounded-lg

            outline-none

            "

          />



          {/* Stock */}

          <input

            type="number"

            name="stock"

            placeholder="Stock"

            value={formData.stock}

            onChange={handleChange}

            className="

            w-full

            border

            p-3

            rounded-lg

            outline-none

            "

          />



          {/* Image */}

          <input

            type="file"

            className="

            w-full

            border

            p-3

            rounded-lg

            "

          />



          {/* Button */}

          <button

            type="submit"

            className="

            bg-[#3BB77E]

            text-white

            px-8

            py-3

            rounded-lg

            font-semibold

            hover:bg-[#2ea56c]

            transition

            "

          >

            Add Product

          </button>

        </form>

      </div>

    </div>

  );

}