"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLogoutMutation } from "@/lib/api/auth";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { logOut } from "@/lib/authSlice";
import { showErrorToast, showSuccessToast } from "./utils/toastHelpers";
import Header from "@/components/Header";
import AnnouncementBar from "@/components/AnnouncementBar";
import Nav from "@/components/Nav";
import HeroSection from "@/components/HeroSection";
import Shopbycategory from "@/components/Shopbycategory";
import ProductSection from "@/components/ProductSection";
import HowItworks from "@/components/HowItworks";
import AppDownload from "@/components/AppDownload";
import Footer from "@/components/Footer";
import RightDrawer from "@/components/RightDrawer";

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

  const products = [
    {
      id: 1,
      name: "Irish Potatoes",
      price: 24.99,
      category: "Tubers & Nuts",
      description:
        "Premium Irish potatoes with a mild, earthy flavor. Excellent for mashing, roasting, or boiling.",
      image: "/images/products/irish-potatoes.png",
    },
    {
      id: 2,
      name: "Cabbage",
      price: 24.99,
      category: "Fruits & Vegetables",
      description:
        "Fresh, firm heads perfect for coleslaw, stir-fries, or steaming. Adds bulk and crunch to any meal.",
      image: "/images/products/cabbage.png",
    },
    {
      id: 3,
      name: "Okro",
      price: 24.99,
      category: "Fruits & Vegetables",
      description:
        "Perfect for soups, stews, and thickening sauces. Essential for traditional Nigerian dishes.",
      image: "/images/products/irish-potatoes.png",
    },
    {
      id: 4,
      name: "Yellow Garri",
      price: 24.99,
      category: "Grains",
      description:
        "Toasted fermented cassava flakes. Suitable for soaking or making Eba.",
      image: "/images/products/irish-potatoes.png",
    },
  ];

  return (
    <div className="md:space-y-20 space-y-6 bg-[#F9F9F9]">
      <HeroSection />
      <Shopbycategory />
      <div className="space-y-6">
        <ProductSection
          title={"Featured Products"}
          products={products}
          link={"/"}
        />
        <ProductSection
          title={"Recommended For You"}
          products={products}
          link={"/"}
        />
      </div>
      <HowItworks />
      <AppDownload />
    </div>
  );
}
