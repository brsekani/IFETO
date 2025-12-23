import { LocalCartItem } from "@/types/cart";

export const localCartName = "IFETOCart";

function isBrowser() {
  return typeof window !== "undefined";
}

export function getLocalCart(): LocalCartItem[] {
  if (!isBrowser()) return [];
  try {
    return JSON.parse(localStorage.getItem(localCartName) || "[]");
  } catch {
    return [];
  }
}

export function saveLocalCart(cart: LocalCartItem[]) {
  if (!isBrowser()) return;
  localStorage.setItem(localCartName, JSON.stringify(cart));
}

export function addToLocalCart(item: LocalCartItem) {
  if (!isBrowser()) return;

  const cart = getLocalCart();
  const existing = cart.find((i) => i.productId === item.productId);

  if (existing) {
    existing.quantity += item.quantity;
  } else {
    cart.push(item);
  }

  saveLocalCart(cart);
}

export function updateLocalCartQty(productId: string, quantity: number) {
  if (!isBrowser()) return;
  console.log(productId);

  const cart = getLocalCart().map((item) =>
    item.productId === productId ? { ...item, quantity } : item
  );

  saveLocalCart(cart);
}

export function removeFromLocalCart(productId: string) {
  if (!isBrowser()) return;

  const cart = getLocalCart().filter((item) => item.productId !== productId);

  saveLocalCart(cart);
}

export function clearLocalCart() {
  if (!isBrowser()) return;
  localStorage.removeItem(localCartName);
}
