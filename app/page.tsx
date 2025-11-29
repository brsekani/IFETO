"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLogoutMutation } from "@/lib/api/auth";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { logOut } from "@/lib/authSlice";
import { showErrorToast, showSuccessToast } from "./utils/toastHelpers";

export default function Home() {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [logout, { isLoading }] = useLogoutMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // Optional: call backend logout
      await logout().catch(() => {});
      showSuccessToast("Logout successfull");

      // Clear token locally
      localStorage.removeItem("IFETOAccessToken");

      // Update Redux
      dispatch(logOut());

      // Redirect to login
      router.replace("/auth/login");
    } catch (error) {
      console.log("Logout error:", error);
      showErrorToast("Logout error");
    }
  };

  useEffect(() => {
    const t = localStorage.getItem("IFETOAccessToken");
    setToken(t);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center text-center px-4">
      <h2 className="text-5xl font-inter font-bold">Welcome to EFETO</h2>
      <p className="font-semibold mt-3 text-2xl text-gray-600">
        An e-commerce platform
      </p>

      {!token && (
        <div className="mt-10 flex gap-4">
          <Link
            href="/auth/login"
            className="px-8 py-3 rounded-lg bg-black text-white text-lg font-medium hover:bg-gray-800 transition"
          >
            Login
          </Link>

          <Link
            href="/auth/signup"
            className="px-8 py-3 rounded-lg border border-black text-black text-lg font-medium hover:bg-black hover:text-white transition"
          >
            Sign Up
          </Link>
        </div>
      )}

      {token && (
        <div className="mt-10">
          <button
            onClick={handleLogout}
            className="px-8 py-3 rounded-lg bg-green-600 text-white text-lg font-medium hover:bg-green-700 transition cursor-pointer"
          >
            {isLoading ? "loging out.." : "logout"}
          </button>
        </div>
      )}
    </div>
  );
}
