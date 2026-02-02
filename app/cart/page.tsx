"use client";

import { useAppSelector } from "@/components/auth/AuthGuard";
import QtySpinner from "@/components/loaders/QtySpinner";
import {
  useGetCartQuery,
  useRemoveCartItemMutation,
  useUpdateCartItemMutation,
} from "@/lib/api/cart";
import {
  useGetLocalCartQuery,
  useRemoveLocalItemMutation,
  useUpdateLocalQtyMutation,
} from "@/lib/api/localCartApi";
import { selectIsAuthenticated } from "@/lib/authSlice";
import { UICartItem } from "@/types/cart";
import { formatPriceKeepSymbol } from "@/utils/formatPrice";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import trash from "@/assets/icons/trash_red.svg";
import eye from "@/assets/icons/eye.svg";
import CartSkeleton from "@/components/loaders/CartPageLoader";
import EmptyCart from "@/components/EmptyCart";
import Link from "next/link";
import ConfirmDeleteCartModal from "@/components/modals/ConfirmDeleteCartModal";
import info from "@/assets/icons/info-circle-primary.svg";
import CartPageLoader from "@/components/loaders/CartPageLoader";

export default function Page() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const router = useRouter();

  const [updatingItemId, setUpdatingItemId] = useState<string | null>(null);
  const [removingItemId, setRemovingItemId] = useState<string | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [agreed, setAgreed] = useState(false);

  const { data, isLoading } = useGetCartQuery(undefined, {
    skip: !isAuthenticated,
  });
  const { data: localItems = [], isLoading: loadingLocal } =
    useGetLocalCartQuery(undefined, {
      skip: isAuthenticated,
    });

  const [updateQty, { isLoading: isUpdatingQty }] = useUpdateCartItemMutation();
  const [updateLocalQty] = useUpdateLocalQtyMutation();
  const [removeItem, { isLoading: isRemoving }] = useRemoveCartItemMutation();
  const [removeLocalItem] = useRemoveLocalItemMutation();

  const cartItems: UICartItem[] = isAuthenticated
    ? (data?.data?.items ?? [])
    : localItems;

  const subtotalPrice = data?.data?.subtotalPrice;

  const handleUpdateQty = async (id: string, quantity: number) => {
    if (quantity < 1) return;

    setUpdatingItemId(id);

    try {
      if (isAuthenticated) {
        // server → cart item id
        updateQty({ itemId: id, quantity }).unwrap();
      } else {
        // local → productId
        updateLocalQty({
          productId: id,
          quantity,
        });
      }
    } finally {
      setUpdatingItemId(null);
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    setRemovingItemId(itemId);

    try {
      if (isAuthenticated) {
        await removeItem(itemId).unwrap();
      } else {
        await removeLocalItem(itemId);
      }
    } finally {
      setRemovingItemId(null);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/auth/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  if (isLoading || loadingLocal) return <CartPageLoader />;

  if (!cartItems.length)
    return (
      <div className="min-h-[70vh] -mt-20 flex items-center justify-center">
        <EmptyCart />
      </div>
    );

  return (
    <div className="bg-[#FAFAFA]">
      <div className="max-w-[1440px] w-full mx-auto px-6 md:px-20 md:pt-6 pb-20 space-y-[17px]">
        <h1 className="text-[24px] leading-8 text-[#2A2A2A] font-semibold py-2.5">
          My Cart
        </h1>

        <div className="flex items-start md:flex-row flex-col w-full gap-6">
          <div className="bg-[#FFFFFF] p-6 shadow-custom1 rounded-2xl w-full md:max-w-[732px]">
            <p className="md:py-4 text-[18px] leading-7 text-[#5A5A5A]">
              Total Items ({cartItems?.length} Items)
            </p>

            <div className="flex-1 overflow-y-auto pb-0">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="md:px-6 py-4 flex items-center gap-4 border-b"
                >
                  {/* Checkbox + Image */}
                  <div className="flex items-center gap-4">
                    <div className="bg-[#EFEEEE] px-3 py-4 rounded">
                      <Image
                        src={
                          item?.product?.images?.[0] ||
                          "/images/placeholder.png"
                        }
                        alt={item?.product?.name || "product"}
                        width={80}
                        height={58}
                        className="w-20 h-[58px] object-contain"
                      />
                    </div>
                  </div>

                  {/* Right section */}
                  <div className="flex flex-col flex-1 space-y-4">
                    <div className="space-y-2">
                      <p className="font-medium text-[18px] text-[#5A5A5A]">
                        {item?.product?.name}
                      </p>
                      <p className="font-semibold text-[20px] text-[#5A5A5A]">
                        {formatPriceKeepSymbol(item?.price)}
                      </p>

                      <p>Unit: {item?.product?.weight} kg</p>
                    </div>

                    {/* Quantity + Delete */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            handleUpdateQty(
                              isAuthenticated ? item.id : item.productId,
                              item.quantity - 1,
                            )
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
                            handleUpdateQty(
                              isAuthenticated ? item.id : item.productId,
                              item.quantity + 1,
                            )
                          }
                          className="bg-[#EFEEEE] w-6 h-6 flex items-center justify-center rounded cursor-pointer transition active:scale-90 disabled:opacity-40"
                        >
                          <ChevronRight className="w-3 h-3 text-black" />
                        </button>
                      </div>

                      <div className="flex items-center gap-4">
                        {removingItemId === item.id ? (
                          <QtySpinner />
                        ) : (
                          <Image
                            onClick={() => {
                              isAuthenticated
                                ? setItemToDelete(item?.id)
                                : setItemToDelete(item?.productId);

                              setDeleteModalOpen(true);
                            }}
                            src={trash}
                            alt="Delete"
                            className="w-6 h-6 opacity-70 cursor-pointer
                         transition hover:scale-110 hover:opacity-100 active:scale-90"
                          />
                        )}

                        <Link href={`products/${item?.product?.id}`}>
                          <Image
                            onClick={() => {
                              console.log(item);
                              isAuthenticated
                                ? setItemToDelete(item.id)
                                : setItemToDelete(item.productId);

                              setDeleteModalOpen(true);
                            }}
                            src={eye}
                            alt="view"
                            className="w-6 h-6 opacity-70 cursor-pointer
                         transition hover:scale-110 hover:opacity-100 active:scale-90"
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#FFFFFF] p-4 shadow-custom1 rounded-2xl w-full md:max-w-[524px]">
            <p className="md:p-4 text-[20px] leading-[30px] text-[#2A2A2A] font-bold border-b-[0.6px] border-[#EFEEEE]">
              Order Summary
            </p>

            <div className="p-4 md:space-y-4 space-y-2.5 md:text-[20px] text-[14px] md:leading-[30px] leading-5 text-[#484848] font-medium">
              <div className="flex justify-between">
                <p>Sub Total:</p>
                <p>{formatPriceKeepSymbol(subtotalPrice)}</p>
              </div>

              <div className="flex justify-between">
                <p>Weight:</p>
                <p>{data?.data?.totalWeight}</p>
              </div>

              <div className="flex justify-between">
                <div className="relative inline-block group">
                  {/* Trigger */}
                  <div className="flex items-center gap-2.5 text-[#17683A] underline cursor-pointer">
                    <p>Weight Fee:</p>
                    <Image src={info} alt="info" />
                  </div>

                  {/* Tooltip */}
                  <div
                    className="
      absolute left-36 -top-16 mt-2 w-[245px]
      rounded-xl bg-white p-2 text-[12px] leading-[18px] text-[#484848]
      shadow-[0px_4px_24px_0px_#0000000A]
      opacity-0 scale-95
      pointer-events-none
      transition-all duration-200
      group-hover:opacity-100 group-hover:scale-100
      z-50
    "
                  >
                    <p className="font-semibold mb-4 text-[#363636] text-[14px] leading-5">
                      Weight Breakdown
                    </p>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Weight Category</span>
                        <span className="text-[#2A2A2A]">
                          Air Cargo – 1kg to 5kg
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span>Total Weight</span>
                        <span className="text-[#2A2A2A]">4.8 kg</span>
                      </div>

                      <div className="flex justify-between">
                        <span>Shipping Rate</span>
                        <span className="text-[#2A2A2A]">$9 per kg</span>
                      </div>

                      <div className="flex justify-between font-semibold">
                        <span>Total Weight Fee</span>
                        <span>4.8 kg × $9 = $43.2</span>
                      </div>
                    </div>
                  </div>
                </div>

                <p>$43.2</p>
              </div>

              <div className="flex justify-between md:text-[24px] text-[16px] md:leading-8 leading-6 text-[#484848] font-bold border-t-[0.2px] border-[#787878] py-3">
                <p>Total:</p>
                <p>{formatPriceKeepSymbol(data?.data?.totalPrice)}</p>
              </div>

              <div className="space-y-4 text-[14px] leading-5 text-[#787878]">
                {/* <p>Exchange rate locked: 1 USD = 1250 NGN</p> */}

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    name="rememberMe"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="w-6 h-6 appearance-none border border-light-active rounded focus:ring-0 cursor-pointer checked:bg-primary checked:border-primary custom-checkbox"
                  />

                  <p className="text-[14px] leading-5">
                    I agree to{" "}
                    <span className="text-[#17683A] underline">
                      <Link href={"/policy/privacy"}>
                        IFETO's Terms and Return Policy
                      </Link>
                    </span>
                  </p>
                </div>
              </div>

              <button
                disabled={isLoading || !data?.data?.items?.length || !agreed}
                onClick={() => {
                  router.push("/checkout");
                }}
                className={`h-12 w-full rounded-md text-[18px] font-semibold transition disabled:bg-[#C7D3CC] text-[#FFFFFF]
                  ${
                    isLoading || !agreed
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-primary text-white hover:bg-green-700"
                  }`}
              >
                Proceed to Checkout
              </button>

              <button
                onClick={() => {
                  router.push("/shop");
                }}
                className="w-full h-12 border border-[#27AE60] rounded-[6px] text-[18px] leading-7 font-semibold text-[#27AE60] cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {deleteModalOpen && (
          <ConfirmDeleteCartModal
            setDeleteModalOpen={setDeleteModalOpen}
            setItemToDelete={setItemToDelete}
            itemToDelete={itemToDelete}
            handleRemoveItem={handleRemoveItem}
            loading={isRemoving}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
