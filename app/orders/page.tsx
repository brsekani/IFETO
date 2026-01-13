"use client";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import OrderCard from "@/components/OrderCard";
import emptyImg from "@/assets/icons/emptyState.svg";
import Image from "next/image";

import { useGetOrdersQuery } from "@/lib/api/orders";

const page = () => {
  const { data: ordersData, isLoading, error } = useGetOrdersQuery();
  const [activeFilter, setActiveFilter] = useState("All orders");

  const orders = ordersData?.data.data || [];

  const filterOptions = [
    "All orders",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];

  const filteredOrders =
    activeFilter === "All orders"
      ? orders
      : orders.filter(
          (order) => order.status?.toLowerCase() === activeFilter.toLowerCase()
        );

  const getFilterStyle = (status: string, isActive: boolean) => {
    if (!isActive)
      return {
        container: "text-light hover:bg-gray-50",
        count: "text-light bg-[#EFEEEE]",
      };

    switch (status.toLowerCase()) {
      case "processing":
      case "pending":
        return {
          container: "bg-[#FFF8E6] text-[#F2C94C]",
          count: "bg-[#F2C94C] text-white",
        };
      case "shipped":
        return {
          container: "bg-[#E6F7FF] text-[#2F80ED]",
          count: "bg-[#2F80ED] text-white",
        };
      case "cancelled":
        return {
          container: "bg-[#FFEEEE] text-[#EB5757]",
          count: "bg-[#EB5757] text-white",
        };
      case "delivered":
        return {
          container: "bg-[#F3E8FF] text-[#9333EA]",
          count: "bg-[#9333EA] text-white",
        };
      case "all orders":
      default:
        return {
          container: "bg-[#E3FFEF] text-primary",
          count: "bg-primary text-white",
        };
    }
  };

  if (error) {
    return (
      <div className="w-full lg:py-7 lg:px-20 md:px-14 px-6 bg-[#FAFAFA] max-w-[1440px] mx-auto min-h-[50vh] flex flex-col justify-center items-center">
        <p className="text-xl font-semibold text-[#EB5757]">
          Failed to load orders.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-6 py-2 bg-primary text-white rounded-md"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="w-full lg:py-7 lg:px-20 md:px-14 px-6 bg-[#FAFAFA] max-w-[1440px] mx-auto min-h-screen">
      <div className="w-full flex gap-4 items-center text-[#5A5A5A] font-semibold">
        <Link
          href="/"
          className="hover:text-primary hover:underline duration-300"
        >
          Home
        </Link>
        <ChevronRight className="w-4 h-4 text-light" />
        <span className="">Orders</span>
      </div>

      <div className="w-full overflow-x-auto flex items-center gap-6 mt-6 pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {filterOptions.map((option) => {
          const styles = getFilterStyle(option, activeFilter === option);
          const count =
            option === "All orders"
              ? orders.length
              : orders.filter(
                  (o) => o.status?.toLowerCase() === option.toLowerCase()
                ).length;

          return (
            <button
              key={option}
              onClick={() => setActiveFilter(option)}
              className={`shrink-0 flex gap-2 items-center px-4 py-2 rounded-[6px] font-medium transition-colors duration-300 whitespace-nowrap ${styles.container}`}
            >
              {option}
              <span
                className={`px-2 py-0.5 rounded-xl text-xs transition-colors duration-300 ${styles.count}`}
              >
                {isLoading ? "..." : count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="my-6 grid gap-6">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="w-full h-48 bg-gray-100 animate-pulse rounded-2xl"
            />
          ))
        ) : filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))
        ) : (
          <div className="text-center min-h-[40vh] flex flex-col justify-center items-center w-full bg-white rounded-2xl shadow-custom2 p-10">
            <Image
              src={emptyImg}
              alt="empty"
              className="w-[164px] h-[156px] lg:w-[250px] lg:h-[240px]"
            />
            <p className="lg:text-lg text-base font-semibold mt-1">
              No orders yet
            </p>
            <p className="text-[#5A5A5A] lg:text-lg text-sm mt-3">
              {activeFilter === "All orders"
                ? "When you make a purchase, your order history will appear here."
                : `No orders found for current filter: ${activeFilter}`}
            </p>
            <Link
              href="/shop"
              className="mt-8 w-[280px] h-12 rounded-[6px] bg-primary text-white font-medium text-lg flex justify-center items-center"
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
