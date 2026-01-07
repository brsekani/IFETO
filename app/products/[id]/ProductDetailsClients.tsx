"use client";

import arrowRight from "@/assets/icons/arrow-right1.svg";
import arrowDown from "@/assets/icons/arrow-down-black.svg";
import Fruits from "@/assets/images/Fruits Image.png";
import ProductImageCarousel from "@/components/ProductImageCarousel";
import Image from "next/image";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import QuantityBox from "@/components/QuantityBox";
import { useGetProductByIdQuery } from "@/lib/api/products";
import ProductDetailsSkeleton from "@/components/loaders/ProductDetailsSkeleton";
import { formatPriceKeepSymbol } from "@/utils/formatPrice";
import { selectIsAuthenticated } from "@/lib/authSlice";
import { useAppSelector } from "@/components/auth/AuthGuard";
import { useRef, useState } from "react";
import { useAddCartItemMutation, useGetCartQuery } from "@/lib/api/cart";
import {
  useAddLocalItemMutation,
  useGetLocalCartQuery,
} from "@/lib/api/localCartApi";
import { isItemInCart } from "@/lib/cart/isItemInCart";
import { showSuccessToast } from "@/app/utils/toastHelpers";
import Link from "next/link";

export default function ProductDetailsClients({ id }: { id: string }) {
  const [quantity, setQuantity] = useState(1);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const lastActionRef = useRef<number>(0);

  const { data: serverCart } = useGetCartQuery(undefined, {
    skip: !isAuthenticated,
  });

  const { data: localCart = [] } = useGetLocalCartQuery(undefined, {
    skip: isAuthenticated,
  });

  const {
    data: productsRes,
    isLoading: productsLoading,
    isFetching: productsFetching,
    isError: productsError,
  } = useGetProductByIdQuery(id);

  const cartItems = serverCart?.data?.items ?? [];

  const alreadyInCart = isItemInCart(
    productsRes?.data?.id,
    isAuthenticated,
    cartItems,
    localCart
  );

  const [addCartItem, { isLoading }] = useAddCartItemMutation();
  const [addLocalItem] = useAddLocalItemMutation();
  const maxQuantity = productsRes?.data?.quantity;

  console.log(id);
  console.log(productsRes);

  const handleAddToCart = () => {
    const now = Date.now();
    if (now - lastActionRef.current < 500) return;
    lastActionRef.current = now;

    if (!productsRes?.data) return;

    if (!isAuthenticated) {
      addLocalItem({
        id: productsRes.data.id,
        productId: productsRes.data.id,
        quantity: quantity,
        price: productsRes.data.price,
        product: {
          name: productsRes.data.name,
          images: productsRes.data.images,
        },
      });
      setQuantity(1);
      showSuccessToast(
        alreadyInCart
          ? "Product quantity updated in cart"
          : "Product added to cart"
      );
      return;
    }

    addCartItem({
      productId: productsRes.data.id,
      quantity: quantity,
    });
    setQuantity(1);
    showSuccessToast(
      alreadyInCart
        ? "Product quantity updated in cart"
        : "Product added to cart"
    );
  };

  if (productsLoading || productsFetching) {
    return <ProductDetailsSkeleton />;
  }

  if (productsError) {
    return <p className="p-10">Failed to load product</p>;
  }

  return (
    <div className="bg-[#FAFAFA]">
      <div className="max-w-[1440px] w-full mx-auto px-6 md:px-20 pt-6 pb-20">
        <div className="flex">
          <Link
            href={"/"}
            className="py-2 px-4 text-[16px] leading-6 font-semibold text-[#5A5A5A]"
          >
            Home
          </Link>
          <Image src={arrowRight} alt="arrowRight" />
          <Link
            href={`/shop?filters=${productsRes?.data?.categoryId}`}
            className="py-2 px-4 text-[16px] leading-6 font-semibold text-[#5A5A5A] text-nowrap truncate"
          >
            {productsRes?.data?.category?.name}
          </Link>

          <Image src={arrowRight} alt="arrowRight" />
          <div className="py-2 px-4 text-[16px] leading-6 font-semibold text-[#27AE60] text-nowrap truncate">
            {productsRes?.data?.name}
          </div>
        </div>

        <div className="flex md:flex-row flex-col items-center md:gap-20 gap-6 w-full mb-10">
          <ProductImageCarousel images={productsRes?.data?.images} />
          <div className="text-[#2A2A2A] w-full">
            <div className="font-semibold md:space-y-[18px] space-y-[11px]">
              <h1 className="md:text-[36px] text-[20px] md:leading-11 leading-[30px] md:tracking-[-2%]">
                {productsRes?.data?.name}
              </h1>
              <p className="text-[18px] leading-7">
                {formatPriceKeepSymbol(productsRes?.data?.price)}
              </p>
            </div>

            <QuantityBox
              unitPrice={productsRes?.data?.price}
              quantity={quantity}
              setQuantity={setQuantity}
              maxQuantity={maxQuantity}
            />

            <button
              onClick={handleAddToCart}
              disabled={isAuthenticated && isLoading}
              className={`cursor-pointer h-12 w-full font-semibold text-[18px] leading-7 rounded-sm
    ${alreadyInCart ? "bg-[#1F8A4E]" : "bg-primary"} text-white`}
            >
              {alreadyInCart ? "Add More" : "Add to Cart"}
            </button>
          </div>
        </div>

        <div className="space-y-8">
          <div className="md:space-y-6 space-y-3">
            <h6 className="md:leading-8 leading-7 md:text-[24px] text-[18px] font-medium text-[#2A2A2A]">
              Description
            </h6>

            <p className="md:text-[20px] text-[14px] md:leading-[30px] leading-5 text-[#606060]">
              {productsRes?.data?.description}
            </p>
          </div>

          <div className="md:space-y-6 space-y-3">
            <h6 className="md:leading-8 leading-7 md:text-[24px] text-[18px] font-medium text-[#2A2A2A]">
              Storage Instructions
            </h6>

            <p className="md:text-[20px] text-[14px] md:leading-[30px] leading-5 text-[#606060]">
              {productsRes?.data?.storageInstructions}
            </p>
          </div>
        </div>

        <div className="md:py-20 py-6">
          <h5 className="md:text-[32px] text-[20px] leading-[30px] md:leading-[38px] text-[#2A2A2A] font-semibold">
            Related Items You May Like
          </h5>

          <div className="grid grid-cols-2 xl:grid-cols-4 md:gap-6 gap-3"></div>
        </div>
      </div>
    </div>
  );
}
