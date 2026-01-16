"use client";

import { useRef } from "react";
import { useAppSelector } from "@/components/auth/AuthGuard";
import { selectIsAuthenticated } from "@/lib/authSlice";
import { useAddCartItemMutation, useGetCartQuery } from "@/lib/api/cart";
import {
  useAddLocalItemMutation,
  useGetLocalCartQuery,
} from "@/lib/api/localCartApi";
import { isItemInCart } from "@/lib/cart/isItemInCart";
import { showSuccessToast } from "@/app/utils/toastHelpers";
import { LocalCartItem } from "@/types/cart";

type UseAddToCartArgs = {
  product: any;
};

export function useAddToCart({ product }: UseAddToCartArgs) {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const lastActionRef = useRef<number>(0);

  /** ---------- Queries ---------- */
  const { data: serverCart } = useGetCartQuery(undefined, {
    skip: !isAuthenticated,
  });

  const { data: localCart = [] } = useGetLocalCartQuery(undefined, {
    skip: isAuthenticated,
  });

  /** ---------- Mutations ---------- */
  const [addCartItem, { isLoading }] = useAddCartItemMutation();
  const [addLocalItem] = useAddLocalItemMutation();

  /** ---------- Derived state ---------- */
  const cartItems = serverCart?.data?.items ?? [];

  const alreadyInCart = isItemInCart(
    product.id,
    isAuthenticated,
    cartItems,
    localCart
  );

  /** ---------- Action ---------- */
  const handleAddToCart = () => {
    const now = Date.now();
    if (now - lastActionRef.current < 500) return;
    lastActionRef.current = now;

    if (!isAuthenticated) {
      addLocalItem({
        id: product.id,
        productId: product.id,
        quantity: 1,
        price: product.price,
        product: {
          name: product.name,
          images: product.images?.length
            ? product.images
            : ["/images/placeholder.png"],
        },
      });

      showSuccessToast(
        alreadyInCart
          ? "Product quantity updated in cart"
          : "Product added successfully"
      );
      return;
    }

    addCartItem({
      productId: product.id,
      quantity: 1,
    });

    showSuccessToast(
      alreadyInCart
        ? "Product quantity updated in cart"
        : "Product added successfully"
    );
  };

  return {
    handleAddToCart,
    alreadyInCart,
    isLoading,
    isAuthenticated,
  };
}
