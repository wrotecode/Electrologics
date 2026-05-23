"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { useAuth } from "@/context/AuthContext";

import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

export default function OrdersPage() {
  const { user, loading } = useAuth();

  const router = useRouter();

  const [orders, setOrders] = useState<
    any[]
  >([]);

  const [loadingOrders, setLoadingOrders] =
    useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;

      try {
        const q = query(
          collection(db, "orders"),

          where("userId", "==", user.uid),

          orderBy("createdAt", "desc")
        );

        const querySnapshot =
          await getDocs(q);

        const fetchedOrders =
          querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

        setOrders(fetchedOrders);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingOrders(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (loading || loadingOrders) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-8">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border rounded-2xl p-6 shadow"
            >
              <div className="flex justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-semibold">
                    Order
                  </h2>

                  <p className="text-gray-500">
                    {new Date(
                      order.createdAt?.seconds *
                        1000
                    ).toLocaleString()}
                  </p>
                </div>

                <h2 className="text-2xl font-bold">
                  ₹{order.total}
                </h2>
              </div>

              <div className="space-y-4">
                {order.items.map(
                  (item: any) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 border-b pb-4"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded"
                      />

                      <div className="flex-1">
                        <h3 className="font-semibold">
                          {item.name}
                        </h3>

                        <p className="text-gray-500">
                          Qty:{" "}
                          {
                            item.quantity
                          }
                        </p>
                      </div>

                      <p>
                        ₹
                        {item.price *
                          item.quantity}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}