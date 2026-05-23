"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  const { cart } = useCart();

  return (
    <nav className="flex justify-between items-center p-5 bg-black text-white">
      <h1 className="text-2xl font-bold">
        ElectroLogics
      </h1>

      <div className="flex gap-5 items-center">
        <Link href="/">Home</Link>

        <Link href="/products">
          Products
        </Link>

        <Link href="/cart">
          Cart ({cart.length})
        </Link>

        {user ? (
          <>
            <p className="text-sm">
              {user.email}
            </p>

            <button
              onClick={logout}
              className="bg-white text-black px-4 py-1 rounded hover:bg-gray-200 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login">
              Login
            </Link>

            <Link href="/signup">
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}