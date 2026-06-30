"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";

function SearchContent() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`/api/products?search=${q}`);

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
    if (q) {
      fetchProducts();
    } else {
      setProducts([]);
    }
  }, [q]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">
        Search Result :
        <span className="text-[#3BB77E] ml-2">
          {q}
        </span>
      </h1>

      {loading && (
        <p className="text-lg font-medium">
          Loading...
        </p>
      )}

      {!loading && products.length === 0 && (
        <p className="text-lg">
          No Products Found
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-xl shadow overflow-hidden"
          >
            <img
              src={item.images?.[0]}
              alt={item.title}
              className="w-full h-52 object-cover"
            />

            <div className="p-4">
              <h2 className="font-bold text-lg">
                {item.title}
              </h2>

              <p className="text-gray-500">
                {item.brand}
              </p>

              <p className="text-[#3BB77E] font-bold text-xl mt-2">
                ₹ {item.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading Search...</div>}>
      <SearchContent />
    </Suspense>
  );
}