import { clearLocalCart, getLocalCart } from "./localCart";
import { useSyncCartMutation } from "@/lib/api/cart";

export async function syncLocalCart(syncCart: any) {
  const localCart = getLocalCart();

  if (localCart.length === 0) return;

  await syncCart(localCart);
  clearLocalCart();
}
