"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Pencil, Trash2, Plus } from "lucide-react";

export default function AdminProducts() {
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("/api/products");

      if (res.data.success) {
        setProducts(res.data.products);
      }
    } catch (error) {
      console.log(error);
      toast.error("Unable to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      const res = await axios.delete(`/api/products/${id}`);

      if (res.data.success) {
        toast.success("Product Deleted");

        fetchProducts();
      }
    } catch (error) {
      console.log(error);
      toast.error("Delete Failed");
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-3xl font-bold">
            Manage Products
          </h1>

          <p className="text-gray-500">
            View, Edit & Delete Products
          </p>

        </div>

        <button
          onClick={() => router.push("/admin/product/add")}
          className="bg-[#3BB77E] text-white px-5 py-3 rounded-lg flex items-center gap-2 hover:bg-green-600"
        >
          <Plus size={20} />
          Add Product
        </button>

      </div>

      {loading ? (
        <div className="text-center text-xl">
          Loading...
        </div>
      ) : (

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-7">

          {products.map((product) => (

            <div
              key={product._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition"
            >

              <div className="relative h-56">

                <Image
                  src={product.images?.[0]}
                  alt={product.title}
                  fill
                  className="object-cover"
                />

              </div>

              <div className="p-5">

                <h2 className="font-bold text-xl">
                  {product.title}
                </h2>

                <p className="text-sm text-gray-500 mt-2">
                  {product.brand}
                </p>

                <p className="text-gray-600 mt-2">
                  {product.category}
                </p>

                <div className="flex justify-between mt-4">

                  <span className="font-bold text-[#3BB77E] text-xl">
                    ₹{product.price}
                  </span>

                  <span className="text-gray-600">
                    Stock : {product.stock}
                  </span>

                </div>

                <div className="flex gap-3 mt-6">

                  <button
                    onClick={() =>
                      router.push(
                        `/admin/edit/${product._id}`
                      )
                    }
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg flex items-center justify-center gap-2"
                  >
                    <Pencil size={18} />
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(product._id)
                    }
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg flex items-center justify-center gap-2"
                  >
                    <Trash2 size={18} />
                    Delete
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}
    </div>
  );
}