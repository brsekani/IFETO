"use client";
import {
  ChevronLeft,
  CircleCheck,
  ChevronRight,
  Info,
  Calendar,
  ChevronDown,
} from "lucide-react";
import React, { forwardRef } from "react";
import Image from "next/image";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import Skeleton from "@/components/loaders/Skeleton";
import { useCreateRoutine } from "@/hooks/useCreateRoutine";

const CustomDateInput = forwardRef(({ value, onClick }: any, ref: any) => (
  <div
    className="border border-[#CFCFCF] rounded-2xl p-4 flex items-center gap-2 justify-between cursor-pointer w-full"
    onClick={onClick}
    ref={ref}
  >
    <div className="flex items-center gap-2">
      <Calendar className="w-5 h-5 text-[#606060]" />
      <span className="text-sm text-[#363636] font-medium">{value}</span>
    </div>
    <ChevronDown className="w-5 h-5 text-light" />
  </div>
));

CustomDateInput.displayName = "CustomDateInput";

const CreateRoutine = () => {
  const {
    router,
    sessionId,
    isSessionLoading,
    isCreating,
    isRecalculating,
    selectedFrequency,
    setSelectedFrequency,
    isCustomFrequency,
    setIsCustomFrequency,
    customDays,
    setCustomDays,
    isConsented,
    setIsConsented,
    startDate,
    setStartDate,
    items,
    totals,
    selectedItemId,
    setSelectedItemId,
    selectedItem,
    updateQuantity,
    totalPerDelivery,
    frequencies,
    handleCreateRoutine,
  } = useCreateRoutine();

  // Skeleton Loading State
  if (isSessionLoading) {
    return (
      <div className="w-full lg:py-7 lg:px-20 md:px-14 px-6 bg-[#FAFAFA] max-w-[1440px] mx-auto min-h-[calc(100vh-8rem)] overflow-hidden pb-10">
        <Skeleton className="w-16 h-6 mb-8 mt-4 rounded" />

        <div className="lg:mt-14 mt-8">
          <Skeleton className="h-8 w-1/3 mb-2 rounded" />
          <Skeleton className="h-6 w-1/2 mb-10 rounded" />

          {/* Card Skeletons */}
          <div className="bg-white lg:p-8 p-4 rounded-2xl shadow-custom2 mt-4 space-y-4">
            <Skeleton className="h-8 w-1/4 rounded mb-4" />
            <Skeleton className="h-16 w-full rounded" />
            <Skeleton className="h-16 w-full rounded" />
            <Skeleton className="h-16 w-full rounded" />
          </div>

          <div className="bg-white lg:p-8 p-6 rounded-2xl mt-8 shadow-custom2">
            <Skeleton className="h-8 w-1/4 rounded mb-6" />
            <Skeleton className="h-12 w-full rounded mb-4" />
            <Skeleton className="h-4 w-1/2 rounded" />
          </div>

          <div className="bg-white lg:p-8 p-6 rounded-2xl mt-8 shadow-custom2">
            <Skeleton className="h-8 w-1/4 rounded mb-6" />
            <Skeleton className="h-24 w-full rounded mb-4" />
            <Skeleton className="h-4 w-1/2 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!sessionId) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>No Session ID provided.</p>
      </div>
    );
  }

  return (
    <div className="w-full lg:py-7 lg:px-20 md:px-14 px-6 bg-[#FAFAFA] max-w-[1440px] mx-auto min-h-[calc(100vh-8rem)] overflow-hidden pb-10">
      <button
        onClick={() => router.back()}
        className="w-full cursor-pointer flex gap-1 items-center text-light font-semibold"
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="">back</span>
      </button>

      <div className="lg:mt-14 mt-8">
        <div className="">
          <h2 className="lg:text-3xl text-xl font-semibold text-[#363636]">
            Create a Routine Order
          </h2>
          <p className="text-[#606060] mt-2 lg:text-2xl">
            Choose how often you'd like this item delivered automatically.
          </p>
        </div>

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

        {/* Delivery Schedule */}
        <div className="bg-white lg:p-8 p-6 rounded-2xl mt-8 shadow-custom2">
          <h3 className="text-2xl font-semibold lg:mb-6 mb-4">
            Delivery Schedule
          </h3>

          <div className="w-full">
            <DatePicker
              selected={startDate}
              onChange={(date: any) => setStartDate(date || new Date())}
              dateFormat="do MMMM, yyyy"
              customInput={<CustomDateInput />}
              wrapperClassName="w-full"
            />
          </div>

          <p className="mt-4 text-[#606060] text-sm">
            Your first routine order will be placed on{" "}
            <span className="font-semibold text-[#363636]">
              {format(startDate, "do MMMM, yyyy")}
            </span>
          </p>
        </div>

        {/* Quantity and Order */}
        {items.length > 0 && (
          <div className="bg-white lg:p-8 p-4 rounded-2xl mt-8 shadow-custom2">
            <h3 className="text-2xl font-semibold mb-4 lg:mb-6">
              Quantity and Order
            </h3>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4">
                <span className="text-lg text-light">
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
                      disabled={!selectedItemId}
                    >
                      <ChevronLeft className="w-3 h-3 text-[#363636]" />
                    </button>
                    <span className="text-sm text-[#5A5A5A] min-w-6 text-center">
                      {selectedItem?.quantity || 0}
                    </span>
                    <button
                      onClick={() =>
                        selectedItemId && updateQuantity(selectedItemId, 1)
                      }
                      className="p-2 bg-[#EFEEEE] hover:bg-white rounded-md transition-colors"
                      disabled={!selectedItemId}
                    >
                      <ChevronRight className="w-3 h-3 text-[#363636]" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-lg text-light">Unit weight:</span>
                <span className="text-lg text-light">
                  {selectedItem?.unitWeight || 0} kg
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-lg text-light">Total weight:</span>
                <span className="text-lg text-light">
                  {totals.totalWeight?.toFixed(2)} kg
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-lg text-light">Estimated shipping:</span>
                <span className="text-lg text-light">
                  {isRecalculating ? (
                    <Skeleton className="h-6 w-20 rounded" />
                  ) : (
                    `${totals.currencySymbol}${totals.estimatedShipping.toLocaleString()}`
                  )}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Pricing Summary */}
        <div className="bg-white lg:p-8 p-4 rounded-2xl mt-8 shadow-custom2">
          <h3 className="text-2xl font-semibold text-[#363636] mb-4 lg:mb-8">
            Pricing summary
          </h3>

          <div className="flex flex-col gap-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center text-lg gap-2 text-light"
              >
                <span>
                  {item.name} ({item.quantity}x {totals.currencySymbol}
                  {Number(item.price)?.toFixed(2)})
                </span>
                <span>
                  {totals.currencySymbol}
                  {(Number(item.price) * item.quantity)?.toFixed(2)}
                </span>
              </div>
            ))}

            <div className="border-b border-[#E5E5E5] my-2"></div>

            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-[#363636]">
                Total Per Delivery
              </span>
              <span className="text-2xl font-bold">
                {isRecalculating ? (
                  <Skeleton className="h-8 w-24 rounded" />
                ) : (
                  `${totals.currencySymbol}${totalPerDelivery?.toFixed(2)}`
                )}
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-1 items-center text-light lg:text-lg text-sm mt-4 lg:mt-6">
          <Info className="lg:w-5 w-4 lg:h-5 h-4" />
          <span>
            Final shipping cost may vary slightly based on destination and
            weight changes.
          </span>
        </div>

        <div className="mt-4 lg:mt-6 border border-[#F59E0B] bg-[#FFD18329] rounded-[4px] p-4 flex items-center gap-3">
          <input
            type="checkbox"
            id="consent-checkbox"
            checked={isConsented}
            onChange={(e) => setIsConsented(e.target.checked)}
            className="custom-checkbox w-6 h-6 cursor-pointer border-none outline-none focus:outline-none "
          />
          <label
            htmlFor="consent-checkbox"
            className="text-sm text-light cursor-pointer select-none"
          >
            I understand this is an automatic recurring order and I can pause or
            cancel anytime
          </label>
        </div>

        <div className="mt-6 py-6 flex items-center w-full gap-6">
          <button
            onClick={() => router.back()}
            className="border border-primary text-primary px-5 h-12 text-lg font-semibold rounded w-full"
          >
            Cancel
          </button>
          <button
            onClick={handleCreateRoutine}
            disabled={!isConsented || isCreating}
            className="bg-primary text-white px-5 h-12 text-lg font-semibold rounded w-full disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer flex items-center justify-center"
          >
            {isCreating ? "Creating..." : "Create Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateRoutine;
