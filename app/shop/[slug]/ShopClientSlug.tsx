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
import Pagination from "@/components/Pagination";
import { useGetAllCategoriesQuery } from "@/lib/api/categories";
import { useGetAllProductsQuery } from "@/lib/api/products";
import ProductCardSkeleton from "@/components/loaders/ProductCardShop";
import FilterDropdownSkeleton from "@/components/loaders/FilterDropdownSkeleton";
import { FilterDropdownListSkeleton } from "@/components/loaders/FilterDropdownListSkeleton";
import { Product } from "@/types/product";
import { Category } from "@/types/category";
import { useGetCollectionWithProductsBySlugQuery } from "@/lib/api/collections";

type ShopClientProps = {
  slug?: string;
};

export default function ShopClientSlug({ slug }: ShopClientProps) {
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
  } = useGetCollectionWithProductsBySlugQuery(slug as string);

  console.log(productsRes);

  const products = productsRes?.data.products ?? [];
  const meta = productsRes?.data?.meta;

  const totalItems = meta?.total ?? 0;

  if (error) {
    return (
      <p className="text-center py-10 text-red-500">
        Failed to load categories
      </p>
    );
  }

  return (
    <div className="max-w-[1440px] mx-auto px-6 md:px-20 pt-8 pb-20 md:space-y-8 space-y-3">
      <h1 className="md:text-[32px] text-[20px] leading-[30px] md:leading-[38px] text-[#2A2A2A] font-semibold">
        {productsRes?.data?.name}
      </h1>

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
