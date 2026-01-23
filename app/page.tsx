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
import { useGetCollectionWithProductsQuery } from "@/lib/api/collections";
import ProductSectionSkeleton from "@/components/loaders/ProductSectionSkeleton";
import { Collection, Product } from "@/types/product";

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  createdAt: string; // ISO date
  updatedAt: string; // ISO date
}

export default function Home() {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [logout, { isLoading }] = useLogoutMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    data,
    isLoading: isGetting,
    error,
  } = useGetCollectionWithProductsQuery();
  console.log(data?.data);

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
    <div className="md:space-y-20 space-y-6 bg-[#F9F9F9]">
      <HeroSection />
      <Shopbycategory />
      <div className="space-y-6">
        {isGetting ? (
          <>
            <ProductSectionSkeleton />
            <ProductSectionSkeleton />
          </>
        ) : (
          data?.data.map((item: Collection) => (
            <ProductSection
              key={item.id}
              title={item.name}
              products={item.products}
              link={`/shop/${item?.slug}`}
            />
          ))
        )}
      </div>
      <HowItworks />
      <AppDownload />
    </div>
  );
}
