"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function EditProductPage() {

  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    brand: "",
    category: "",
    price: "",
    stock: "",
    images: [],
  });

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {

      const res = await axios.get(`/api/products/${id}`);

      if (res.data.success) {
        setFormData(res.data.product);
      }

    } catch (error) {

      console.log(error);

      toast.error("Unable to load Product");

    } finally {

      setLoading(false);

    }
  };

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

  };
  const handleUpdate = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.put(`/api/products/${id}`, formData);

    if (res.data.success) {
      toast.success("Product Updated Successfully");
      router.push("/admin/products");
    }
  } catch (error) {
    console.log(error);
    toast.error("Update Failed");
  }
};

if (loading) {
  return (
    <div className="flex items-center justify-center min-h-screen text-2xl">
      Loading...
    </div>
  );
}

return (
  <div className="max-w-3xl mx-auto p-8">

    <div className="bg-white shadow-lg rounded-xl p-8">

      <h1 className="text-3xl font-bold mb-8">
        Edit Product
      </h1>

      <form onSubmit={handleUpdate} className="space-y-5">

        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Product Title"
          className="w-full border rounded-lg p-3"
        />

        <textarea
          rows={5}
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border rounded-lg p-3"
        />

        <input
          type="text"
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          placeholder="Brand"
          className="w-full border rounded-lg p-3"
        />

        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category"
          className="w-full border rounded-lg p-3"
        />

        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full border rounded-lg p-3"
        />

        <input
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          placeholder="Stock"
          className="w-full border rounded-lg p-3"
        />

        {formData.images?.length > 0 && (
          <img
            src={formData.images[0]}
            alt={formData.title}
            className="w-40 h-40 rounded-lg object-cover"
          />
        )}

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold"
        >
          Update Product
        </button>

      </form>

    </div>

  </div>
);
}