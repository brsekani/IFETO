import { useEffect } from "react";
import { useSyncCartMutation } from "@/lib/api/cart";
import { prepareLocalCartForSync } from "@/lib/cart/prepareSync";
import { clearLocalCart } from "@/lib/cart/localCart";
import { useAppSelector } from "@/components/auth/AuthGuard";
import { selectIsAuthenticated } from "@/lib/authSlice";

export const useSyncCartAfterLogin = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const [syncCart] = useSyncCartMutation();

  useEffect(() => {
    if (!isAuthenticated) return;

    const sync = async () => {
      const items = prepareLocalCartForSync();

      if (!items.length) return;

      try {
        await syncCart(items).unwrap();
        clearLocalCart(); // 🚨 IMPORTANT
      } catch (error) {
        console.error("Cart sync failed", error);
      }
    };

    sync();
  }, [isAuthenticated, syncCart]);
};
