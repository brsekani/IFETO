"use client";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import OrderCard from "@/components/OrderCard";
import garriImg from "@/assets/images/Garri.png";
import cabbageImg from "@/assets/images/cabbage.png";
import emptyImg from "@/assets/icons/emptyState.svg";
import Image from "next/image";

const page = () => {
  const [activeFilter, setActiveFilter] = useState("All orders");
  const filterOptions = [
    "All orders",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];

  const mockOrders = [
    {
      id: "789012",
      date: "Dec 15, 2025",
      total: 125.5,
      status: "Processing",
      items: [
        { name: "Garri", image: garriImg },
        { name: "Cabbage", image: cabbageImg },
      ],
      weight: "3.5kg",
      shippingMethod: "Standard Shipping",
      estimatedDelivery: "Dec 22, 2025",
    },
    {
      id: "789011",
      date: "Dec 10, 2025",
      total: 450.0,
      status: "Shipped",
      items: [{ name: "Cabbage", image: cabbageImg }],
      weight: "1.2kg",
      shippingMethod: "Express Delivery",
      estimatedDelivery: "Dec 12, 2025",
    },
    {
      id: "789010",
      date: "Dec 05, 2025",
      total: 89.99,
      status: "Delivered",
      items: [
        { name: "Garri", image: garriImg },
        { name: "Garri", image: garriImg },
        { name: "Cabbage", image: cabbageImg },
      ],
      weight: "5.0kg",
      shippingMethod: "Standard Shipping",
      estimatedDelivery: "Dec 08, 2025",
    },
    {
      id: "789009",
      date: "Nov 28, 2025",
      total: 320.0,
      status: "Cancelled",
      items: [{ name: "Garri", image: garriImg }],
      weight: "2.0kg",
      shippingMethod: "Pickup Station",
      estimatedDelivery: "Cancelled",
    },
    {
      id: "789013",
      date: "Dec 18, 2025",
      total: 55.0,
      status: "Processing",
      items: [{ name: "Cabbage", image: cabbageImg }],
      weight: "0.5kg",
      shippingMethod: "Standard Shipping",
      estimatedDelivery: "Dec 25, 2025",
    },
  ];

  const filteredOrders =
    activeFilter === "All orders"
      ? mockOrders
      : mockOrders.filter((order) => order.status === activeFilter);

  const getFilterStyle = (status: string, isActive: boolean) => {
    if (!isActive)
      return {
        container: "text-light hover:bg-gray-50",
        count: "text-light bg-[#EFEEEE]",
      };

    switch (status.toLowerCase()) {
      case "processing":
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

  return (
    <div className="w-full lg:py-7 lg:px-20 md:px-14 px-6 bg-[#FAFAFA] max-w-[1440px] mx-auto">
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
                {option === "All orders"
                  ? mockOrders.length
                  : mockOrders.filter((o) => o.status === option).length}
              </span>
            </button>
          );
        })}
      </div>

      <div className="my-6 grid gap-6">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))
        ) : (
          <div className="text-center min-h-[20vh] flex flex-col justify-center items-center w-full">
            <Image
              src={emptyImg}
              alt="empty"
              className="w-[164px] h-[156px] lg:w-[250px] lg:h-[240px]"
            />
            <p className="lg:text-lg text-base font-semibold mt-1">
              No orders yet
            </p>
            <p className="text-[#5A5A5A] lg:text-lg text-sm mt-3">
              When you make a purchase, your order history will appear here.
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
