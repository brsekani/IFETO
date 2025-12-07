"use client";

import filterIcon from "@/assets/icons/filterIcon.svg";
import box from "@/assets/icons/box.svg";
import user from "@/assets/icons/user.svg";
import arrowDownGreen from "@/assets/icons/arrow-right-green.svg";
import ProductCardShop from "@/components/ProductCardShop";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { useState } from "react";

export default function page() {
  const [page, setPage] = useState(0);

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

  const items = [
    { label: "My Order", icon: box },
    { label: "My Account", icon: user },
    { label: "Address", icon: user },
  ];

  return (
    <div className="max-w-[1440px] mx-auto px-6 md:px-20 pt-8 pb-20 space-y-8">
      <h1 className="md:text-[32px] text-[20px] leading-[30px] md:leading-[38px] text-[#2A2A2A] font-semibold">
        All Items
      </h1>
      <DropdownMenu>
        <DropdownMenuTrigger
          className="
          flex items-center gap-2 border border-[#41B079]
          text-[#41B079] rounded-lg px-5 py-2.5
          hover:bg-[#41B079]/10 transition
          outline-none
        "
        >
          {/* Filter Icon */}
          <Image src={filterIcon} alt="filter" width={18} height={18} />

          {/* Text */}
          <span className="text-sm">Filter</span>

          {/* Arrow */}
          <Image src={arrowDownGreen} alt="arrow" width={16} height={16} />
        </DropdownMenuTrigger>

        {/* DROPDOWN CONTENT */}
        <DropdownMenuContent
          align="end"
          className="w-56 bg-white rounded-xl shadow-[0_4px_30px_rgba(0,0,0,0.1)] py-4 border-none"
        >
          <div className="flex flex-col gap-4 px-6">
            {items.map((item) => (
              <DropdownMenuItem
                key={item.label}
                className="
                flex items-center gap-3 cursor-pointer
                text-[#6F6F6F] focus:bg-transparent
                hover:opacity-70
              "
              >
                <Image src={item.icon} width={20} height={20} alt="" />
                <span>{item.label}</span>
              </DropdownMenuItem>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="grid grid-cols-2 xl:grid-cols-4 md:gap-6 gap-3">
        {products.map((product, index) => (
          <ProductCardShop product={product} index={index} />
        ))}
      </div>
    </div>
  );
}
