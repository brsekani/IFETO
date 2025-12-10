"use client";

import filterIcon from "@/assets/icons/filterIcon.svg";
import closeWhite from "@/assets/icons/closeWhite.svg";
import arrowDownGreen from "@/assets/icons/arrow-right-green.svg";
import ProductCardShop from "@/components/ProductCardShop";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import Image from "next/image";
import { Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { categories } from "../constants/categories";
import Pagination from "@/components/Pagination";

export default function ShopClient() {
  const searchParams = useSearchParams();
  const perPage = 30;
  const router = useRouter();
  const pathname = usePathname();

  const selected = searchParams.get("filters")?.split(",") || [];

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

  const toggleFilter = (item: string) => {
    const current = searchParams.get("filters")?.split(",") || [];
    const updated = current.includes(item)
      ? current.filter((f) => f !== item)
      : [...current, item];

    const params = new URLSearchParams(searchParams);
    updated.length
      ? params.set("filters", updated.join(","))
      : params.delete("filters");

    router.replace(`${pathname}?${params.toString()}`);
  };

  const removeFilter = (item: string) => {
    const updated = selected.filter((f) => f !== item);
    const params = new URLSearchParams(searchParams);

    updated.length
      ? params.set("filters", updated.join(","))
      : params.delete("filters");

    router.replace(`${pathname}?${params.toString()}`);
  };

  const clearAll = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("filters");
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="max-w-[1440px] mx-auto px-6 md:px-20 pt-8 pb-20 md:space-y-8 space-y-3">
      <div className="flex items-center md:items-start md:gap-8 gap-2  justify-between md:justify-start flex-row md:flex-col">
        <h1 className="md:text-[32px] text-[20px] leading-[30px] md:leading-[38px] text-[#2A2A2A] font-semibold">
          All Items
        </h1>
        <DropdownMenu>
          <DropdownMenuTrigger
            className="
          flex items-center md:gap-2 gap-1 border border-[#41B079]
          text-[#41B079] rounded-lg md:px-5 px-2.5 md:py-2.5 py-1.5
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
            className="w-[230px] bg-white rounded-xl shadow-[0_4px_30px_rgba(0,0,0,0.1)] p-4 border-none"
          >
            <div className="flex flex-col">
              {categories.map((item) => {
                const isSelected = selected.includes(item);

                return (
                  <DropdownMenuItem
                    key={item}
                    onClick={() => toggleFilter(item)}
                    className={`
        flex items-center justify-between cursor-pointer
        px-2 py-4
        hover:opacity-70
        ${isSelected ? "text-[#41B079] font-semibold" : "text-[#6F6F6F]"}
      `}
                  >
                    <span>{item}</span>

                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-[#41B079]"></span>
                    )}
                  </DropdownMenuItem>
                );
              })}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <AnimatePresence>
        {selected.length >= 1 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col gap-3 md:gap-5"
          >
            <h6 className="text-[24px] leading-8 font-semibold text-[#2A2A2A]">
              Showing filtered items{" "}
            </h6>

            <div className="flex items-center flex-wrap md:gap-6 gap-3">
              <AnimatePresence>
                {selected.map((item) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, scale: 0.8, y: 5 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="bg-[#124E2B] flex items-center gap-2 text-white w-fit py-1.5 px-2.5 rounded-[10px]"
                  >
                    <span>{item}</span>

                    <Image
                      src={closeWhite}
                      alt="remove"
                      className="cursor-pointer"
                      onClick={() => removeFilter(item)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>

              {selected.length > 0 && (
                <motion.p
                  onClick={clearAll}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-[16px] leading-6 font-semibold text-[#124E2B] cursor-pointer"
                >
                  Clear filter
                </motion.p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-2 xl:grid-cols-4 md:gap-6 gap-3">
        {products.map((product, index) => (
          <ProductCardShop product={product} index={index} />
        ))}
      </div>

      <Suspense fallback={<p>Loading pagination...</p>}>
        <Pagination totalItems={300} />
      </Suspense>
    </div>
  );
}
