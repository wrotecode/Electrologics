"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";

import {
  doc,
  getDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import { useCart } from "@/context/CartContext";

import { useAuth } from "@/context/AuthContext";

import { useRouter } from "next/navigation";

export default function ProductDetailsPage() {
  const params = useParams();

  const id = params.id as string;

  const [product, setProduct] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  const { addToCart } = useCart();

  const { user } = useAuth();

  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(
          db,
          "products",
          id
        );

        const docSnap =
          await getDoc(docRef);

        if (docSnap.exists()) {
          setProduct({
            id: docSnap.id,
            ...docSnap.data(),
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleAddToCart = () => {
    if (!user) {
      alert("Please login first");

      router.push("/login");

      return;
    }

    addToCart(product);

    alert("Product added to cart");
  };

  if (loading) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="p-10">
        Product not found
      </div>
    );
  }

  return (
    <div className="p-10 grid md:grid-cols-2 gap-10">
      <div>
        <img
          src={product.image}
          alt={product.name}
          className="w-full rounded-2xl"
        />
      </div>

      <div>
        <h1 className="text-5xl font-bold">
          {product.name}
        </h1>

        <p className="text-gray-600 mt-6 text-lg">
          {product.description}
        </p>

        <h2 className="text-4xl font-bold mt-8">
          ₹{product.price}
        </h2>

        <button
          onClick={handleAddToCart}
          className="mt-8 bg-black text-white px-8 py-4 rounded-2xl hover:bg-gray-800 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}