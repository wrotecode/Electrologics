"use client";

import { useState } from "react";

import { addDoc, collection } from "firebase/firestore";

import { db } from "@/lib/firebase";

export default function AdminPage() {
  const [name, setName] = useState("");

  const [price, setPrice] = useState("");

  const [image, setImage] = useState("");

  const [description, setDescription] =
    useState("");

  const [category, setCategory] =
  useState("");

  const handleAddProduct = async () => {
    if (
      !name ||
      !price ||
      !image ||
      !description || !category
    ) {
      alert("Please fill all fields");

      return;
    }

    try {
      await addDoc(collection(db, "products"), {
        name,

        price: Number(price),

        image,

        description,
      });

      alert("Product Added");

      setName("");
      setPrice("");
      setImage("");
      setDescription("");
    } catch (error) {
      console.log(error);

      alert("Something went wrong");
    }
  };

  return (
    <div className="p-10 max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">
        Admin Dashboard
      </h1>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="w-full border p-3 rounded"
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) =>
            setPrice(e.target.value)
          }
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) =>
            setImage(e.target.value)
          }
          className="w-full border p-3 rounded"
        />
        <input
  type="text"
  placeholder="Category"
  value={category}
  onChange={(e) =>
    setCategory(e.target.value)
  }
  className="w-full border p-3 rounded"
/>

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          className="w-full border p-3 rounded h-32"
        />

        <button
          onClick={handleAddProduct}
          className="w-full bg-black text-white py-4 rounded-xl"
        >
          Add Product
        </button>
      </div>
    </div>
  );
}