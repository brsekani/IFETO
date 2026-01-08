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
import { useGetAllCategoriesQuery } from "@/lib/api/categories";
import { useGetAllProductsQuery } from "@/lib/api/products";
import ProductCardSkeleton from "@/components/loaders/ProductCardShop";
import FilterDropdownSkeleton from "@/components/loaders/FilterDropdownSkeleton";
import { FilterDropdownListSkeleton } from "@/components/loaders/FilterDropdownListSkeleton";
import { Product } from "@/types/product";
import { Category } from "@/types/category";

export default function ShopClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const perPage = 16;
  const page = Number(searchParams.get("page")) || 1;
  const limit = perPage;
  const selected = searchParams.get("filters");

  const {
    data,
    isLoading: categoriesLoading,
    error,
  } = useGetAllCategoriesQuery();

  const {
    data: productsRes,
    isLoading: productsLoading,
    isFetching: productsFetching,
    isError: productsError,
  } = useGetAllProductsQuery({
    page,
    limit,
    categoryId: selected || undefined,
  });

  const categoriesFromApi: Category[] = data?.data ?? [];

  const products = productsRes?.data.data ?? [];
  const meta = productsRes?.data?.meta;

  const totalPages = meta?.totalPages ?? 1;
  const totalItems = meta?.total ?? 0;

  const toggleFilter = (item: string) => {
    const params = new URLSearchParams(searchParams);

    // clicking same item again = remove filter
    if (searchParams.get("filters") === item) {
      params.delete("filters");
    } else {
      params.set("filters", item);
    }

    params.delete("page");

    router.replace(`${pathname}?${params.toString()}`);
  };

  const clearAll = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("filters");
    params.delete("page");
    router.replace(`${pathname}?${params.toString()}`);
  };

  if (error) {
    return (
      <p className="text-center py-10 text-red-500">
        Failed to load categories
      </p>
    );
  }

  return (
    <div className="max-w-[1440px] mx-auto px-6 md:px-20 pt-8 pb-20 md:space-y-8 space-y-3">
      <div className="flex items-center md:items-start md:gap-8 gap-2  justify-between md:justify-start flex-row md:flex-col">
        <h1 className="md:text-[32px] text-[20px] leading-[30px] md:leading-[38px] text-[#2A2A2A] font-semibold">
          All Items
        </h1>
        {categoriesLoading ? (
          <FilterDropdownSkeleton />
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center md:gap-2 gap-1 border border-[#41B079] text-[#41B079] rounded-lg md:px-5 px-2.5 md:py-2.5 py-1.5 hover:bg-[#41B079]/10 transition outline-none">
              <Image src={filterIcon} alt="filter" width={18} height={18} />
              <span className="text-sm">Filter</span>
              <Image src={arrowDownGreen} alt="arrow" width={16} height={16} />
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-[230px] bg-white rounded-xl shadow-[0_4px_30px_rgba(0,0,0,0.1)] p-4 border-none"
            >
              {categoriesLoading ? (
                <FilterDropdownListSkeleton />
              ) : (
                <div className="flex flex-col">
                  {categoriesFromApi.map((item) => {
                    const isSelected = selected === item.id;

                    return (
                      <DropdownMenuItem
                        key={item.id}
                        onClick={() => toggleFilter(item.id)}
                        className={`
                  flex items-center justify-between cursor-pointer px-2 py-4
                  ${
                    isSelected
                      ? "text-[#41B079] font-semibold"
                      : "text-[#6F6F6F]"
                  }
                `}
                      >
                        <span>{item.name}</span>
                        {isSelected && (
                          <span className="w-2 h-2 rounded-full bg-[#41B079]" />
                        )}
                      </DropdownMenuItem>
                    );
                  })}
                </div>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      <AnimatePresence>
        {selected && (
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
                {selected &&
                  (() => {
                    const category = categoriesFromApi.find(
                      (c) => c.id === selected
                    );
                    if (!category) return null;

                    return (
                      <motion.div
                        key={category.id}
                        className="bg-[#124E2B] flex items-center gap-2 text-white w-fit py-1.5 px-2.5 rounded-[10px]"
                      >
                        <span>{category.name}</span>
                        <Image
                          src={closeWhite}
                          alt="remove"
                          className="cursor-pointer"
                          onClick={clearAll}
                        />
                      </motion.div>
                    );
                  })()}
              </AnimatePresence>

              {selected && (
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

      <div className="relative">
        <div className="grid grid-cols-2 xl:grid-cols-4 md:gap-6 gap-3">
          {productsLoading || productsFetching
            ? Array.from({ length: 20 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))
            : products.map((product: Product) => (
                <ProductCardShop
                  product={product}
                  index={product.id}
                  key={product.id}
                />
              ))}
        </div>
      </div>

      <Suspense fallback={<p>Loading pagination...</p>}>
        <Pagination totalItems={totalItems} perPage={perPage} />
      </Suspense>
    </div>
  );
}
