"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  Bell,
  ChevronLeft,
  Pause,
  PencilLine,
  Play,
  Repeat,
  Trash2,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link"; // Kept for empty state
import CancelRoutineModal from "@/components/modals/CancelRoutineModal";
import {
  useGetRoutineOrdersQuery,
  usePauseRoutineOrderMutation,
  useResumeRoutineOrderMutation,
  useCancelRoutineOrderMutation,
} from "@/lib/api/routineOrders";

const page = () => {
  const router = useRouter();
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState<any>(null);
  const [loadingAction, setLoadingAction] = useState<{
    id: string;
    action: string;
  } | null>(null);

  const { data: routineOrdersData, isLoading } = useGetRoutineOrdersQuery();
  const [pauseRoutineOrder] = usePauseRoutineOrderMutation();
  const [resumeRoutineOrder] = useResumeRoutineOrderMutation();
  const [cancelRoutineOrder, { isLoading: isCanceling }] =
    useCancelRoutineOrderMutation();

  const routineOrders = routineOrdersData?.data || [];

  const handleToggleStatus = async (id: string, currentStatus: string) => {
    const action = currentStatus === "ACTIVE" ? "PAUSE" : "RESUME";
    setLoadingAction({ id, action });
    try {
      if (currentStatus === "ACTIVE") {
        await pauseRoutineOrder(id).unwrap();
      } else {
        await resumeRoutineOrder(id).unwrap();
      }
    } catch (error) {
      console.error("Failed to update status:", error);
    } finally {
      setLoadingAction(null);
    }
  };

  const handleCancelClick = (order: any) => {
    setOrderToCancel(order);
    setShowCancelModal(true);
  };

  const confirmCancel = async () => {
    if (!orderToCancel?.id) return;
    try {
      await cancelRoutineOrder(orderToCancel.id).unwrap();
      setShowCancelModal(false);
      setOrderToCancel(null);
    } catch (error) {
      console.error("Failed to cancel order:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-full lg:shadow-custom2 bg-white lg:rounded-2xl p-6 min-h-[400px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="w-full h-full lg:shadow-custom2 bg-white lg:rounded-2xl p-6">
      <div className="lg:block flex items-center gap-2 w-full justify-between">
        <button
          className="lg:hidden flex items-center gap-2 outline-none text-light cursor-pointer"
          onClick={() => router.back()}
        >
          <ChevronLeft className="w-4" />
          <span className="font-medium">back</span>
        </button>

        <div className="flex items-center gap-2 lg:mt-6">
          <Repeat className="w-6 text-light hidden lg:block" />
          <span className="lg:text-2xl text-xl font-semibold ">
            Routine Orders
          </span>
        </div>
        <div className="lg:hidden"></div>
      </div>

      {routineOrders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-lg text-light mb-4">You have no routine orders.</p>
          <Link
            href="/shop"
            className="px-6 py-2 bg-primary text-white rounded-md"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        routineOrders.map((order: any) => (
          <div
            key={order.id}
            className="mt-6 bg-white shadow-custom2 rounded-2xl p-4"
          >
            <div className="pt-4">
              <div className="grid lg:gap-6 gap-4 grid-cols-[repeat(auto-fit,minmax(400px,1fr))]">
                {order.items?.map((item: any, idx: number) => (
                  <div key={idx} className="flex gap-3 lg:gap-6">
                    <div className="lg:w-[128px] w-[71px] lg:h-[112px] h-[66px] bg-[#EFEEEE] rounded-[4px] lg:rounded-[6.5px] p-1 relative">
                      {/* Handle optional product/images */}
                      {item.product?.images?.[0] ? (
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-contain p-2"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-xs text-gray-400">
                          No Image
                        </div>
                      )}
                    </div>
                    <div className="lg:space-y-4 space-y-1 w-full">
                      <div className="flex items-center justify-between gap-2">
                        <h2 className="font-semibold text-sm lg:text-lg text-[#5a5a5a]">
                          {item.product?.name}
                        </h2>
                        <h2 className="font-semibold hidden lg:block text-sm lg:text-lg text-[#5a5a5a]">
                          {order.currencySymbol}
                          {(
                            item.product?.sellingPrice ||
                            item.product?.baseCost ||
                            0
                          ).toLocaleString()}
                        </h2>
                      </div>
                      <h2 className="text-light text-xs lg:text-base ">
                        Quantity: {item.quantity}
                      </h2>
                      <h2 className="text-[#5A5A5A] font-semibold lg:font-bold lg:text-xl text-sm lg:text-right ">
                        {order.currencySymbol}
                        {(
                          (item.product?.sellingPrice ||
                            item.product?.baseCost ||
                            0) * item.quantity
                        ).toLocaleString()}
                      </h2>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-around lg:justify-between gap-2 lg:gap-6 mt-6">
                <div className="lg:w-full">
                  <h4 className="text-sm text-light mb-2">Frequency</h4>
                  <p className="font-semibold capitalize">
                    {order.frequency?.toLowerCase() === "custom"
                      ? `${order.customIntervalDays} Days`
                      : order.frequency?.toLowerCase()}
                  </p>
                </div>
                <div className="lg:w-full">
                  <h4 className="text-sm text-light mb-2">Next Delivery</h4>
                  <p className="font-semibold">
                    {order.nextRunDate
                      ? new Date(order.nextRunDate).toLocaleDateString()
                      : order.status === "PAUSED"
                        ? "Paused"
                        : "Pending"}
                  </p>
                </div>
                <div className="lg:w-full">
                  <h4 className="text-sm text-light mb-2">Total Price</h4>
                  <p className="font-semibold">
                    {order.currencySymbol}
                    {order.totalAmount?.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 mt-6">
                <div className="flex items-center gap-6">
                  {/* Edit Flow - Maybe redirect to a separate edit page or modal. For now preserving Link but pointing to edit with ID. */}
                  <Link
                    href={`/account/routine/edit/${order.id}`}
                    className="md:w-[150px] h-12 bg-primary px-5 rounded-[6px] text-white text-center flex items-center justify-center gap-2.5 cursor-pointer"
                  >
                    <PencilLine className="w-5 h-5 " />
                    <span className="font-semibold text-lg hidden md:block">
                      Edit
                    </span>
                  </Link>

                  {order.status === "ACTIVE" ? (
                    <button
                      onClick={() => handleToggleStatus(order.id, order.status)}
                      disabled={loadingAction?.id === order.id}
                      className="md:w-[150px] h-12 border border-[#F59E0B] px-5 rounded-[6px] text-[#F59E0B] text-center flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loadingAction?.id === order.id &&
                      loadingAction?.action === "PAUSE" ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span className="font-semibold text-lg hidden md:block">
                            Pausing...
                          </span>
                        </>
                      ) : (
                        <>
                          <Pause className="w-5 h-5" />
                          <span className="font-semibold text-lg hidden md:block">
                            Pause
                          </span>
                        </>
                      )}
                    </button>
                  ) : (
                    <button
                      onClick={() => handleToggleStatus(order.id, order.status)}
                      disabled={loadingAction?.id === order.id}
                      className="md:w-[150px] h-12 border border-primary px-5 rounded-[6px] text-primary text-center flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loadingAction?.id === order.id &&
                      loadingAction?.action === "RESUME" ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span className="font-semibold text-lg hidden md:block">
                            Resuming...
                          </span>
                        </>
                      ) : (
                        <>
                          <Play className="w-5 h-5" />
                          <span className="font-semibold text-lg hidden md:block">
                            Resume
                          </span>
                        </>
                      )}
                    </button>
                  )}

                  <button
                    onClick={() => handleCancelClick(order)}
                    disabled={loadingAction?.id === order.id}
                    className="md:w-[150px] h-12 border border-[#E53E3E] px-5 rounded-[6px] text-[#E53E3E] text-center flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Trash2 className="w-5 h-5 " />
                    <span className="font-semibold text-lg hidden md:block">
                      Cancel
                    </span>
                  </button>
                </div>

                {order.status === "ACTIVE" ? (
                  <div className="px-4 py-1 bg-[#34C7591A] rounded-3xl text-primary text-center ">
                    Active
                  </div>
                ) : (
                  <div className="px-4 py-1 bg-[#F59E0B1A] rounded-3xl text-[#F59E0B] text-center ">
                    Paused
                  </div>
                )}
              </div>
            </div>
          </div>
        ))
      )}

      <CancelRoutineModal
        isOpen={showCancelModal}
        title={isCanceling ? "Canceling Order..." : "Cancel Routine Order"}
        isLoading={isCanceling}
        onClose={() => !isCanceling && setShowCancelModal(false)}
        onConfirm={confirmCancel}
        items={
          orderToCancel?.items
            ? orderToCancel.items.map((item: any) => ({
                name: item.product?.name,
                image: item.product?.images?.[0], // Correct mapping for modal
                priceDisplay: `${orderToCancel.currencySymbol}${((item.product?.sellingPrice || item.product?.baseCost || 0) * item.quantity).toLocaleString()}`,
                description: `Quantity: ${item.quantity}`,
              }))
            : []
        }
      />
    </div>
  );
};

export default page;
