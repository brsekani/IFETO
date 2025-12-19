"use client";

import { useEffect, useMemo, useState } from "react";
import close from "@/assets/icons/Close.svg";
import trash from "@/assets/icons/trash.svg";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import EmptyCart from "./EmptyCart";
import {
  useGetCartQuery,
  useRemoveCartItemMutation,
  useUpdateCartItemMutation,
} from "@/lib/api/cart";
import { formatPriceKeepSymbol } from "@/utils/formatPrice";
import QtySpinner from "./loaders/QtySpinner";
import CartSkeleton from "./loaders/CartSkeleton";
import { AnimatePresence, motion } from "framer-motion";
import {
  getLocalCart,
  removeFromLocalCart,
  updateLocalCartQty,
} from "@/lib/cart/localCart";
import { useAppSelector } from "./auth/AuthGuard";
import { selectIsAuthenticated } from "@/lib/authSlice";
import { useDispatch } from "react-redux";
import { api } from "@/lib/api/api";
import { LocalCartItem, UICartItem } from "@/types/cart";
import { productsApi } from "@/lib/api/products";
import { AppDispatch } from "@/lib/store";

const getNumericPrice = (price: string): number =>
  Number.parseFloat(price.replace(/[^\d.]/g, "")) || 0;

const getCurrency = (price: string) => price.match(/[₦$£€]/)?.[0] ?? "₦";

export default function MyCart({ onClose }: { onClose: () => void }) {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const dispatch = useDispatch<AppDispatch>();

  const [checkedIds, setCheckedIds] = useState<string[]>([]);
  const [updatingItemId, setUpdatingItemId] = useState<string | null>(null);
  const [removingItemId, setRemovingItemId] = useState<string | null>(null);

  const { data, isLoading } = useGetCartQuery(undefined, {
    skip: !isAuthenticated,
  });
  const [updateQty, { isLoading: isUpdatingQty }] = useUpdateCartItemMutation();
  const [removeItem] = useRemoveCartItemMutation();

  const [localItems, setLocalItems] = useState<UICartItem[]>([]);
  const [loadingLocal, setLoadingLocal] = useState(!isAuthenticated);

  const formatSubtotal = (currency: string, total: number) =>
    `${currency}${total.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  const guestSubtotalPrice = useMemo(() => {
    if (localItems.length === 0) return "₦0.00";

    const currency = getCurrency(localItems[0].price);
    const total = localItems.reduce(
      (sum, item) => sum + getNumericPrice(item.price) * item.quantity,
      0
    );

    return formatSubtotal(currency, total);
  }, [localItems]);

  const cartItems: UICartItem[] = isAuthenticated
    ? data?.data?.items ?? []
    : localItems;

  const subtotalPrice = isAuthenticated
    ? data?.data?.subtotalPrice ?? "₦0.00"
    : guestSubtotalPrice;

  const allChecked =
    cartItems.length > 0 && checkedIds.length === cartItems.length;

  const toggleItem = (id: string) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const cartItemIds = useMemo(() => cartItems.map((i) => i.id), [cartItems]);

  const toggleAll = () => {
    setCheckedIds(allChecked ? [] : cartItemIds);
  };

  const handleUpdateQty = async (itemId: string, quantity: number) => {
    if (quantity < 1) return;

    setUpdatingItemId(itemId);

    try {
      if (isAuthenticated) {
        await updateQty({ itemId, quantity }).unwrap();
      } else {
        updateLocalCartQty(itemId, quantity);
        setLocalItems((prev) =>
          prev.map((i) => (i.id === itemId ? { ...i, quantity } : i))
        );
      }
    } finally {
      setUpdatingItemId(null);
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    setRemovingItemId(itemId);

    if (isAuthenticated) {
      await removeItem(itemId).unwrap();
    } else {
      removeFromLocalCart(itemId);
      setLocalItems((prev) => prev.filter((i) => i.id !== itemId));
    }

    setRemovingItemId(null);
  };

  useEffect(() => {
    if (isAuthenticated) return;

    const hydrateGuestCart = async () => {
      setLoadingLocal(true);

      const cart = getLocalCart();
      if (!cart.length) {
        setLocalItems([]);
        setLoadingLocal(false);
        return;
      }

      try {
        const responses = await Promise.all(
          cart.map((item) =>
            dispatch(
              productsApi.endpoints.getProductById.initiate(item.productId)
            ).unwrap()
          )
        );

        const hydratedItems: UICartItem[] = cart.map((item) => {
          const product = responses.find(
            (p) => p.data.id === item.productId
          )?.data;

          return {
            id: item.productId,
            quantity: item.quantity,
            price: product?.price ?? "₦0.00",
            product: {
              name: product?.name ?? "Product",
              images: product?.images?.length
                ? product.images
                : ["/placeholder.png"],
            },
          };
        });

        setLocalItems(hydratedItems);
      } catch (err) {
        console.error("Failed to hydrate local cart", err);
      } finally {
        setLoadingLocal(false);
      }
    };

    hydrateGuestCart();
  }, [isAuthenticated, dispatch]);

  useEffect(() => {
    setCheckedIds((prev) => {
      const next = prev.filter((id) =>
        cartItems.some((item) => item.id === id)
      );

      // 🔑 Prevent unnecessary state updates
      if (next.length === prev.length) return prev;

      return next;
    });
  }, [cartItems]);

  if (isLoading || loadingLocal) return <CartSkeleton />;

  if (!cartItems.length) return <EmptyCart onClose={onClose} />;

  return (
    <div className="flex flex-col h-screen">
      {/* HEADER */}
      <div className="flex items-center justify-between px-6 py-4">
        <h5 className="text-[24px] font-semibold text-[#2A2A2A]">My Cart</h5>
        <Image src={close} alt="close" onClick={onClose} />
      </div>

      {isLoading ? (
        <CartSkeleton />
      ) : cartItems.length >= 1 ? (
        <>
          <div className="px-6 py-[18px] flex items-center gap-3 text-[18px] text-[#5A5A5A]">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={allChecked}
                onChange={toggleAll}
                className="peer appearance-none w-6 h-6 rounded border border-gray-400
               checked:bg-[#27AE60] checked:border-[#27AE60]"
              />

              {/* White Dot */}
              <span
                className="pointer-events-none absolute left-1/2 top-1/2 
               -translate-x-1/2 -translate-y-1/2
               w-2 h-2 rounded-full bg-white opacity-0
               peer-checked:opacity-100"
              ></span>
            </label>

            <p>Select All Items</p>
          </div>

          <div className="flex-1 overflow-y-auto pb-0">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="px-6 py-4 flex items-center gap-4 border-b"
              >
                {/* Checkbox + Image */}
                <div className="flex items-center gap-4">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checkedIds.includes(item.id)}
                      onChange={() => toggleItem(item.id)}
                      className="peer appearance-none w-6 h-6 rounded border border-gray-400
               checked:bg-[#27AE60] checked:border-[#27AE60]"
                    />

                    <span
                      className="pointer-events-none absolute left-1/2 top-1/2 
               -translate-x-1/2 -translate-y-1/2
               w-2 h-2 rounded-full bg-white opacity-0
               peer-checked:opacity-100"
                    ></span>
                  </label>

                  <div className="bg-[#EFEEEE] px-3 py-4 rounded">
                    <Image
                      src={item?.product?.images[0]}
                      alt={item.product.name}
                      width={80}
                      height={58}
                      className="w-20 h-[58px] object-contain"
                    />
                  </div>
                </div>

                {/* Right section */}
                <div className="flex flex-col flex-1 space-y-[13px]">
                  <p className="font-medium text-[18px] text-[#5A5A5A]">
                    {item?.product?.name}
                  </p>
                  <p className="font-semibold text-[20px] text-[#5A5A5A]">
                    {formatPriceKeepSymbol(item?.price)}
                  </p>

                  {/* Quantity + Delete */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          handleUpdateQty(item.id, item.quantity - 1)
                        }
                        disabled={item.quantity === 1}
                        className="bg-[#EFEEEE] w-6 h-6 flex items-center justify-center rounded disabled:cursor-default transition active:scale-90 disabled:opacity-40"
                      >
                        <ChevronLeft className="w-3 h-3 text-black" />
                      </button>

                      <AnimatePresence mode="wait">
                        {updatingItemId === item.id ? (
                          <QtySpinner key="spinner" />
                        ) : (
                          <motion.p
                            key={item.quantity}
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 6 }}
                            transition={{ duration: 0.15, ease: "easeOut" }}
                            className="w-7 h-7 flex items-center justify-center text-center"
                          >
                            {item.quantity}
                          </motion.p>
                        )}
                      </AnimatePresence>

                      <button
                        onClick={() =>
                          handleUpdateQty(item.id, item.quantity + 1)
                        }
                        className="bg-[#EFEEEE] w-6 h-6 flex items-center justify-center rounded cursor-pointer transition active:scale-90 disabled:opacity-40"
                      >
                        <ChevronRight className="w-3 h-3 text-black" />
                      </button>
                    </div>

                    {removingItemId === item.id ? (
                      <QtySpinner />
                    ) : (
                      <Image
                        onClick={() => handleRemoveItem(item.id)}
                        src={trash}
                        alt="Delete"
                        className="w-6 h-6 opacity-70 cursor-pointer
               transition hover:scale-110 hover:opacity-100 active:scale-90"
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
            <div className="px-6 py-4 flex items-center justify-end">
              <div className="space-y-2 text-right">
                <p className="text-[14px] text-[#787878]">Subtotal</p>
                <AnimatePresence mode="wait">
                  <motion.h1
                    key={subtotalPrice}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="text-[24px] text-[#5A5A5A] font-bold"
                  >
                    {formatPriceKeepSymbol(subtotalPrice)}
                  </motion.h1>
                </AnimatePresence>
              </div>
            </div>

            <div className="p-4 flex flex-col gap-2">
              <button className="w-full h-12 border border-[#27AE60] rounded-[6px] text-[18px] leading-7 font-semibold text-[#27AE60]">
                View Cart
              </button>
              <button className="w-full h-12 bg-[#27AE60] rounded-[6px] text-[18px] leading-7 font-semibold text-white">
                Checkout
              </button>
            </div>
          </div>
        </>
      ) : (
        <EmptyCart onClose={onClose} />
      )}
    </div>
  );
}
