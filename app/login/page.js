"use client"; // MUST be first line

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { setAuthCookie, isAuthenticated } from "../../utils/auth";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/items";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isAuthenticated()) router.push(redirectUrl);
  }, [router, redirectUrl]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "admin@example.com" && password === "123456") {
      setAuthCookie({ email, isAuthenticated: true });
      toast.success(`Welcome back, ${email}!`);
      router.push(redirectUrl);
    } else {
      toast.error("Invalid email or password.");
    }
  };

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <form onSubmit={handleSubmit} className="max-w-md w-full space-y-6 bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <button type="submit" className="w-full bg-black text-white py-2 rounded">
          Sign in
        </button>
      </form>
    </div>
  );
}
