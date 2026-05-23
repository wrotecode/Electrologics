"use client";

import { useState, useEffect } from "react";

import { useRouter } from "next/navigation";

import { useCart } from "@/context/CartContext";

import { useAuth } from "@/context/AuthContext";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();

  const { user, loading } = useAuth();

  const router = useRouter();

  const [name, setName] = useState("");

  const [address, setAddress] =
    useState("");

  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const total = cart.reduce(
    (acc, item) =>
      acc + item.price * item.quantity,
    0
  );

  const handleOrder = () => {
    if (!name || !address || !phone) {
      alert("Please fill all fields");

      return;
    }

    alert("Order Placed Successfully");

    clearCart();

    router.push("/");
  };

  return (
    <div className="p-10 grid md:grid-cols-2 gap-10">
      <div>
        <h1 className="text-4xl font-bold mb-8">
          Checkout
        </h1>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full border p-3 rounded"
          />

          <textarea
            placeholder="Shipping Address"
            value={address}
            onChange={(e) =>
              setAddress(e.target.value)
            }
            className="w-full border p-3 rounded h-32"
          />

          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
            className="w-full border p-3 rounded"
          />

          <button
            onClick={handleOrder}
            className="w-full bg-black text-white py-4 rounded-xl hover:bg-gray-800 transition"
          >
            Place Order
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-bold mb-6">
          Order Summary
        </h2>

        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between border-b pb-4"
            >
              <div>
                <h3 className="font-semibold">
                  {item.name}
                </h3>

                <p className="text-gray-600">
                  Qty: {item.quantity}
                </p>
              </div>

              <p>
                ₹
                {item.price *
                  item.quantity}
              </p>
            </div>
          ))}
        </div>

        <h2 className="text-3xl font-bold mt-8">
          Total: ₹{total}
        </h2>
      </div>
    </div>
  );
}