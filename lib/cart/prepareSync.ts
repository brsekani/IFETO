// lib/cart/prepareSync.ts
import { getLocalCart } from "./localCart";

export const prepareLocalCartForSync = () => {
  const localCart = getLocalCart();

  return localCart.map((item) => ({
    productId: item.productId,
    quantity: item.quantity,
  }));
};
