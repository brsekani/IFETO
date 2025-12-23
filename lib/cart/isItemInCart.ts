// lib/cart/isItemInCart.ts
import { LocalCartItem, UICartItem } from "@/types/cart";

export function isItemInCart(
  productId: string,
  isAuthenticated: boolean,
  serverItems: UICartItem[] = [],
  localItems: LocalCartItem[] = []
) {
  if (isAuthenticated) {
    return serverItems.some((item) => item?.product?.id === productId);
  }

  if (typeof window === "undefined") return false;

  return localItems.some((item) => item.productId === productId);
}
