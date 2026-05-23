"use client";

import { products } from "@/data/products";

import { useParams } from "next/navigation";

import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

import { useRouter } from "next/navigation";

export default function ProductDetailsPage() {
  const params = useParams();

  const router = useRouter();

  const { addToCart } = useCart();

  const { user } = useAuth();

  const product = products.find(
    (p) => p.id === Number(params.id)
  );

  if (!product) {
    return (
      <div className="p-10">
        Product not found
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!user) {
      alert("Please login first");

      router.push("/login");

      return;
    }

    addToCart(product);

    alert("Added to cart");
  };

  return (
    <div className="p-10">
      <div className="grid md:grid-cols-2 gap-10">
        <img
          src={product.image}
          alt={product.name}
          className="w-full rounded-2xl shadow-lg"
        />

        <div>
          <h1 className="text-5xl font-bold">
            {product.name}
          </h1>

          <p className="text-3xl font-semibold mt-6">
            ₹{product.price}
          </p>

          <p className="text-gray-600 mt-6 text-lg">
            {product.description}
          </p>

          <button
            onClick={handleAddToCart}
            className="mt-8 bg-black text-white px-8 py-4 rounded-xl hover:bg-gray-800 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}