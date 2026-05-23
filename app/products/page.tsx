"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { useCart } from "@/context/CartContext";

import { useAuth } from "@/context/AuthContext";

import { useRouter } from "next/navigation";

import {
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

export default function ProductsPage() {
  const [products, setProducts] =
    useState<any[]>([]);

  const [loadingProducts, setLoadingProducts] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const { addToCart } = useCart();

  const { user } = useAuth();

  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot =
          await getDocs(
            collection(db, "products")
          );

        const fetchedProducts =
          querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

        setProducts(fetchedProducts);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = [
    "All",
    ...new Set(
      products.map(
        (product) => product.category
      )
    ),
  ];

  const filteredProducts = products.filter(
    (product) => {
      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesCategory =
        selectedCategory === "All"
          ? true
          : product.category ===
            selectedCategory;

      return (
        matchesSearch &&
        matchesCategory
      );
    }
  );

  const handleAddToCart = (
    e: React.MouseEvent,
    product: any
  ) => {
    e.preventDefault();

    if (!user) {
      alert("Please login first");

      router.push("/login");

      return;
    }

    addToCart(product);

    alert("Product added to cart");
  };

  if (loadingProducts) {
    return (
      <div className="p-10">
        Loading products...
      </div>
    );
  }

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-8">
        Products
      </h1>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="border p-3 rounded-xl flex-1"
        />

        <select
          value={selectedCategory}
          onChange={(e) =>
            setSelectedCategory(
              e.target.value
            )
          }
          className="border p-3 rounded-xl"
        >
          {categories.map((category) => (
            <option
              key={category}
              value={category}
            >
              {category}
            </option>
          ))}
        </select>
      </div>

      {filteredProducts.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredProducts.map(
            (product) => (
              <Link
                href={`/products/${product.id}`}
                key={product.id}
              >
                <div className="border rounded-2xl p-4 shadow hover:shadow-lg transition cursor-pointer h-full">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-52 w-full object-cover rounded-xl"
                  />

                  <div className="mt-4 flex justify-between items-center">
                    <h2 className="text-2xl font-semibold">
                      {product.name}
                    </h2>

                    <span className="text-sm bg-gray-200 px-3 py-1 rounded-full">
                      {
                        product.category
                      }
                    </span>
                  </div>

                  <p className="text-gray-600 mt-2 line-clamp-2">
                    {
                      product.description
                    }
                  </p>

                  <p className="text-xl font-bold mt-4">
                    ₹{product.price}
                  </p>

                  <button
                    onClick={(e) =>
                      handleAddToCart(
                        e,
                        product
                      )
                    }
                    className="mt-4 w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </Link>
            )
          )}
        </div>
      )}
    </div>
  );
}