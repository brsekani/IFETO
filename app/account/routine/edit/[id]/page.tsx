"use client";
import {
  ChevronLeft,
  CircleCheck,
  Calendar,
  ChevronRight,
  ChevronDown,
  Repeat,
  Pause,
  Play,
  Trash2,
  Loader2,
} from "lucide-react";
import React, { forwardRef } from "react";
import CancelRoutineModal from "@/components/modals/CancelRoutineModal";
import Image from "next/image";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import Skeleton from "@/components/loaders/Skeleton";
import { useEditRoutine } from "@/hooks/useEditRoutine";

const CustomDateInput = forwardRef(({ value, onClick }: any, ref: any) => (
  <div
    className="border border-[#CFCFCF] rounded-2xl p-4 flex items-center gap-2 justify-between cursor-pointer w-full"
    onClick={onClick}
    ref={ref}
  >
    <div className="flex items-center gap-2">
      <Calendar className="w-5 h-5 text-[#606060]" />
      <span className="text-sm text-[#363636] font-medium">
        {value || "Select Date"}
      </span>
    </div>
    <ChevronDown className="w-5 h-5 text-light" />
  </div>
));

CustomDateInput.displayName = "CustomDateInput";

const EditRoutine = () => {
  const {
    router,
    isLoading,
    isUpdating,
    isCanceling,
    isRecalculating,
    selectedFrequency,
    setSelectedFrequency,
    isCustomFrequency,
    setIsCustomFrequency,
    customDays,
    setCustomDays,
    showCancelModal,
    setShowCancelModal,
    loadingAction,
    startDate,
    items,
    currencySymbol,
    orderStatus,
    selectedItemId,
    setSelectedItemId,
    selectedItem,
    updateQuantity,
    totalWeight,
    totalProductsPrice,
    frequencies,
    handleSaveChanges,
    handleToggleStatus,
    handleCancel,
  } = useEditRoutine();

  if (isLoading)
    return (
      <div className="w-full lg:shadow-custom2 bg-white lg:rounded-2xl lg:p-10 p-6 min-h-[600px] flex items-center justify-center">
        <Skeleton className="w-full h-full" />
      </div>
    );

  return (
    <div className="w-full lg:shadow-custom2 bg-white lg:rounded-2xl lg:p-10 p-6">
      <div className="flex items-center gap-2 w-full justify-between font-nunito">
        <button
          className="flex items-center gap-2 outline-none text-light cursor-pointer"
          onClick={() => router.back()}
        >
          <ChevronLeft className="w-4" />
          <span className="font-medium">back</span>
        </button>

        <div className="flex items-center gap-2">
          <Repeat className="w-6 h-6 text-[#606060]" />
          <span className="lg:text-2xl text-xl font-semibold text-[#363636]">
            Routine Order
          </span>
        </div>
        <div className="lg:hidden"></div>
      </div>

      <div className="mt-6">
        {/* Delivery Frequency */}
        <div className="bg-white lg:p-8 p-4 rounded-2xl lg:mt-10 mt-4 shadow-custom2">
          <h3 className="text-lg lg:text-2xl font-semibold text-[#363636] mb-4 lg:mb-6">
            Delivery Frequency
          </h3>

          <div className="flex flex-col gap-4">
            {frequencies.map((freq) => (
              <div
                key={freq.title}
                onClick={() => {
                  setSelectedFrequency(freq.title);
                  setIsCustomFrequency(false);
                }}
                className={`flex justify-between items-center border-primary p-2 lg:p-4 rounded-[8px] cursor-pointer border-[0.6px] transition-all duration-200 ${
                  selectedFrequency === freq.title && !isCustomFrequency
                    ? "bg-[#E3FFEF] "
                    : "bg-white"
                }`}
              >
                <div className="flex flex-col gap-1">
                  <h4 className="font-medium text-[#363636] text-sm lg:text-base">
                    {freq.title}
                  </h4>
                  <p className="text-light text-xs lg:text-sm">
                    {freq.subtext}
                  </p>
                </div>
                {selectedFrequency === freq.title && !isCustomFrequency && (
                  <CircleCheck className="w-6 lg:w-8 h-6 lg:h-8 text-primary" />
                )}
              </div>
            ))}
            {/* Custom Interval Option */}
            <div className="mt-2">
              <div className="flex items-center gap-2 mb-3">
                <input
                  type="checkbox"
                  id="custom-freq-checkbox"
                  checked={isCustomFrequency}
                  onChange={(e) => setIsCustomFrequency(e.target.checked)}
                  className="w-5 h-5 cursor-pointer accent-primary"
                />
                <label
                  htmlFor="custom-freq-checkbox"
                  className="text-[#363636] font-medium cursor-pointer"
                >
                  Select custom day interval
                </label>
              </div>

              {isCustomFrequency && (
                <div className="ml-7">
                  <p className="text-sm text-light mb-2">
                    Enter number of days between deliveries:
                  </p>
                  <input
                    type="number"
                    value={customDays}
                    onChange={(e) => setCustomDays(e.target.value)}
                    placeholder="e.g. 45"
                    min="1"
                    className="border border-[#CFCFCF] rounded-lg p-3 w-full max-w-[200px] outline-none focus:border-primary transition-colors"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Delivery Schedule (Display Only/Editable?) */}
        {/* User didn't properly ask to update date, but "firstRunDate" is usually set on creation. 
            However, we have `nextRunDate`. Let's allow viewing/updating if needed, or just show it.
            For now, I'll keep it disabled or just show info if not in payload requirement.
            Actually payload req didn't list date. It listed items, frequency, customIntervalDays, status.
            So I will NOT send date in update payload. But I will show it.
         */}
        <div className="bg-white lg:p-8 p-6 rounded-2xl mt-8 shadow-custom2">
          <h3 className="text-2xl font-semibold lg:mb-6 mb-4">Next Delivery</h3>
          <div className="w-full">
            <div className="border border-[#CFCFCF] rounded-2xl p-4 flex items-center gap-2 w-full bg-gray-50">
              <Calendar className="w-5 h-5 text-[#606060]" />
              <span className="text-sm text-[#363636] font-medium">
                {startDate ? format(startDate, "do MMMM, yyyy") : "Loading..."}
              </span>
            </div>
          </div>
        </div>

        {/* Quantity and Order */}
        <div className="bg-white lg:p-8 p-4 rounded-2xl mt-8 shadow-custom2">
          <h3 className="text-2xl font-semibold mb-4 lg:mb-6">
            Quantity and Order
          </h3>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4">
              <span className="text-lg text-light font-medium">
                Quantity per delivery:
              </span>
              <div className="flex items-center gap-6">
                {/* Item Images */}
                <div className="flex items-center gap-3">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setSelectedItemId(item.id)}
                      className={`w-[71px] h-16 rounded-[4px] overflow-hidden border-2 cursor-pointer transition-all bg-[#EFEEEE] ${
                        selectedItemId === item.id
                          ? "border-primary scale-110"
                          : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={71}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>

                {/* Counter */}
                <div className="flex items-center gap-4 p-2 px-4 rounded-xl ">
                  <button
                    onClick={() =>
                      selectedItemId && updateQuantity(selectedItemId, -1)
                    }
                    className="p-2 bg-[#EFEEEE] hover:bg-white rounded-md transition-colors"
                  >
                    <ChevronLeft className="w-3 h-3 text-[#363636]" />
                  </button>
                  <span className="text-sm text-[#5A5A5A] min-w-6 text-center">
                    {selectedItem?.quantity}
                  </span>
                  <button
                    onClick={() =>
                      selectedItemId && updateQuantity(selectedItemId, 1)
                    }
                    className="p-2 bg-[#EFEEEE] hover:bg-white rounded-md transition-colors"
                  >
                    <ChevronRight className="w-3 h-3 text-[#363636]" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center text-[#363636] font-medium">
              <span className="text-lg text-light">Unit weight:</span>
              <span className="text-lg">
                {selectedItem?.unitWeight || 0} kg
              </span>
            </div>

            <div className="flex justify-between items-center text-[#363636] font-medium">
              <span className="text-lg text-light">Total weight:</span>
              <span className="text-lg">{totalWeight.toFixed(2)} kg</span>
            </div>
            {/* Removed Estimated shipping static value to avoid confusion or keep 0 */}
          </div>
        </div>

        {/* Pricing Summary */}
        <div className="bg-white lg:p-8 p-4 rounded-2xl mt-8 shadow-custom2">
          <h3 className="text-2xl font-semibold text-[#363636] mb-4 lg:mb-8">
            Pricing summary
          </h3>
          <div className="flex flex-col gap-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center text-lg gap-2 text-light font-medium"
              >
                <span>
                  {item.name} ({item.quantity}x {currencySymbol}
                  {item.price.toLocaleString()})
                </span>
                <span className="text-[#363636]">
                  {currencySymbol}
                  {(item.price * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}
            <div className="border-b border-[#E5E5E5] my-2"></div>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-[#363636]">
                Total Per Delivery
              </span>
              {isRecalculating ? (
                <Skeleton className="h-8 w-32 rounded-lg" />
              ) : (
                <span className="text-2xl font-bold">
                  {currencySymbol}
                  {totalProductsPrice.toLocaleString()}
                  <span className="text-sm font-normal text-gray-500 ml-2">
                    (+ Shipping)
                  </span>
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 lg:mt-10 py-6 font-nunito">
          <button
            onClick={handleSaveChanges}
            disabled={isUpdating}
            className="bg-primary text-white px-5 h-12 text-lg font-semibold rounded-[6px] w-full hover:bg-opacity-90 transition-all cursor-pointer disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {isUpdating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              "Save Changes"
            )}
          </button>

          <div className="flex items-center w-full gap-4 mt-4">
            <button
              onClick={handleToggleStatus}
              disabled={!!loadingAction}
              className="flex-1 border border-[#F59E0B] text-[#F59E0B] px-5 h-12 text-sm lg:text-lg font-semibold rounded-[6px] flex items-center justify-center gap-2 hover:bg-[#F59E0B05] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loadingAction?.action ===
              (orderStatus === "ACTIVE" ? "PAUSE" : "RESUME") ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>
                    {orderStatus === "ACTIVE" ? "Pausing..." : "Resuming..."}
                  </span>
                </>
              ) : (
                <>
                  {orderStatus === "ACTIVE" ? (
                    <Pause className="w-5 h-5" />
                  ) : (
                    <Play className="w-5 h-5" />
                  )}
                  <span
                    className="hidden lg:inline"
                    title={
                      orderStatus === "ACTIVE"
                        ? "Pause Routine Orders"
                        : "Resume Routine Orders"
                    }
                  >
                    {orderStatus === "ACTIVE"
                      ? "Pause Routine Orders"
                      : "Resume Routine Orders"}
                  </span>
                </>
              )}
            </button>
            <button
              onClick={() => setShowCancelModal(true)}
              disabled={!!loadingAction}
              className="flex-1 border border-[#E53E3E] text-[#E53E3E] px-5 h-12 text-sm lg:text-lg font-semibold rounded-[6px] flex items-center justify-center gap-2 hover:bg-[#E53E3E05] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Trash2 className="w-5 h-5" />
              <span className="hidden lg:inline" title="Cancel Routine Orders">
                Cancel Routine Orders
              </span>
            </button>
          </div>
        </div>
      </div>
      <CancelRoutineModal
        isOpen={showCancelModal}
        title={isCanceling ? "Canceling Order..." : "Cancel Routine Order"}
        isLoading={isCanceling}
        onClose={() => !isCanceling && setShowCancelModal(false)}
        onConfirm={handleCancel}
        items={items.map((item) => ({
          ...item,
          priceDisplay: `${currencySymbol}${(item.price * item.quantity).toLocaleString()}`,
          description: `Qty: ${item.quantity} | ${item.unitWeight} kg`,
        }))}
      />
    </div>
  );
};
export default EditRoutine;
