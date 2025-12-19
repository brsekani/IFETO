import { LocalCartItem } from "@/types/cart";

export const localCartName = "IFETOCart";

export function getLocalCart(): LocalCartItem[] {
  return JSON.parse(localStorage.getItem(localCartName) || "[]");
}

export function addToLocalCart(productId: string, qty = 1) {
  const cart = getLocalCart();

  const existing = cart.find((i) => i.productId === productId);

  if (existing) {
    existing.quantity += qty;
  } else {
    cart.push({ productId, quantity: qty });
  }

  localStorage.setItem(localCartName, JSON.stringify(cart));
}

export function clearLocalCart() {
  localStorage.removeItem(localCartName);
}

export function updateLocalCartQty(productId: string, quantity: number) {
  const cart = getLocalCart().map((item) =>
    item.productId === productId ? { ...item, quantity } : item
  );

  localStorage.setItem(localCartName, JSON.stringify(cart));
}

export function removeFromLocalCart(productId: string) {
  const cart = getLocalCart().filter((item) => item.productId !== productId);

  localStorage.setItem(localCartName, JSON.stringify(cart));
}
