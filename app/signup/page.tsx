"use client";

import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import { auth } from "@/lib/firebase";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      alert("Account Created");
    } catch (error: any) {
      alert(error.message);
    }
  };

  const googleSignup = async () => {
    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, provider);

      alert("Google Signup Successful");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-[400px] p-8 shadow-xl rounded-2xl border">
        <h1 className="text-3xl font-bold mb-6">
          Signup
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded mb-4"
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded mb-4"
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          onClick={handleSignup}
          className="w-full bg-black text-white p-3 rounded"
        >
          Create Account
        </button>

        <button
          onClick={googleSignup}
          className="w-full border p-3 rounded mt-4"
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
}