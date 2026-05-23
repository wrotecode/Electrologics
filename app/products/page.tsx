"use client";

import Link from "next/link";

import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

import { useRouter } from "next/navigation";

export default function ProductsPage() {
  const { addToCart } = useCart();

  const { user } = useAuth();

  const router = useRouter();

  const handleAddToCart = (product: any) => {
    if (!user) {
      alert("Please login first");

      router.push("/login");

      return;
    }

    addToCart(product);

    alert("Product added to cart");
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">
        Products
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <Link
            href={`/products/${product.id}`}
            key={product.id}
          >
            <div className="border rounded-xl p-4 shadow hover:shadow-xl transition cursor-pointer">
              <img
                src={product.image}
                alt={product.name}
                className="h-52 w-full object-cover rounded"
              />

              <h2 className="text-xl font-semibold mt-4">
                {product.name}
              </h2>

              <p className="text-gray-600 mt-2">
                ₹{product.price}
              </p>

              <button
                onClick={(e) => {
                  e.preventDefault();

                  handleAddToCart(product);
                }}
                className="mt-4 bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
              >
                Add to Cart
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}