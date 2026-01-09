import { LocalCartItem } from "@/types/cart";

export const getCartQuantity = (
  productId: string,
  isAuthenticated: boolean,
  serverCartItems: any[],
  localCart: LocalCartItem[]
): number => {
  if (isAuthenticated) {
    const item = serverCartItems.find((item) => item.productId === productId);
    return item?.quantity ?? 0;
  }

  const localItem = localCart.find((item) => item.productId === productId);
  return localItem?.quantity ?? 0;
};
