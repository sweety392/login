"use client";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function AddProductPage() {
  

  const [loading, setLoading] = useState(false);

  const [image, setImage] = useState(null);

  const [formData, setFormData] = useState({

    title: "",

    description: "",

    brand: "",

    category: "",

    price: "",

    stock: ""

  });



  

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    });

  };



  // Cloudinary Upload Function
 
  const uploadImage = async () => {

  if (!image) return null;

  const data = new FormData();

  data.append("file", image);

  data.append(
    "upload_preset",
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
  );


  console.log(
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
  );

  console.log(
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  );


  const res = await axios.post(

    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,

    data

  );

  return res.data.secure_url;

};


  // Submit Product
 
  const handleSubmit = async (e) => {

    e.preventDefault();



    try {

      setLoading(true);



      // Step 1: Upload Image

      const imageUrl = await uploadImage();



      // Step 2: Validate

      if (!formData.title || !formData.price) {

        return toast.error("Title and Price required");

      }



      // Step 3: Send to backend

      const response = await axios.post("/api/products", {

        ...formData,

        images: imageUrl ? [imageUrl] : []

      });



      if (response.data.success) {

        toast.success("Product Added Successfully");



        // Reset form

        setFormData({

          title: "",

          description: "",

          brand: "",

          category: "",

          price: "",

          stock: ""

        });



        setImage(null);

      }

    }

    catch (error) {

      toast.error(

        error?.response?.data?.message ||

        error?.message ||

        "Something went wrong"

      );

    }

    finally {

      setLoading(false);

    }

  };



  return (

    <div className="max-w-3xl mx-auto p-6">

      <div className="bg-white shadow rounded-xl p-6">

        <h1 className="text-2xl font-bold mb-6">

          Add Product

        </h1>



        <form onSubmit={handleSubmit} className="space-y-4">



          {/* Title */}

          <input

            type="text"

            name="title"

            placeholder="Product Title"

            value={formData.title}

            onChange={handleChange}

            className="w-full border p-3 rounded"

          />



          {/* Description */}

          <textarea

            name="description"

            placeholder="Description"

            value={formData.description}

            onChange={handleChange}

            className="w-full border p-3 rounded"

          />



          {/* Brand */}

          <input

            type="text"

            name="brand"

            placeholder="Brand"

            value={formData.brand}

            onChange={handleChange}

            className="w-full border p-3 rounded"

          />



          {/* Category */}

          <input

            type="text"

            name="category"

            placeholder="Category"

            value={formData.category}

            onChange={handleChange}

            className="w-full border p-3 rounded"

          />



          {/* Price */}

          <input

            type="number"

            name="price"

            placeholder="Price"

            value={formData.price}

            onChange={handleChange}

            className="w-full border p-3 rounded"

          />



          {/* Stock */}

          <input

            type="number"

            name="stock"

            placeholder="Stock"

            value={formData.stock}

            onChange={handleChange}

            className="w-full border p-3 rounded"

          />



          {/* Image Upload */}

          <input

            type="file"

            accept="image/*"

            onChange={(e) => setImage(e.target.files[0])}

            className="w-full border p-3 rounded"

          />



          {/* Preview */}

          {image && (

            <p className="text-sm text-green-600">

              Image Selected: {image.name}

            </p>

          )}



          {/* Button */}
          
          <button

            type="submit"

            disabled={loading}

            className="w-full bg-[#3BB77E] text-white p-3 rounded font-semibold"

          >

            {loading ? "ADDING..." : "ADD PRODUCT"}

          </button>

          


        </form>

      </div>

    </div>

  );

}