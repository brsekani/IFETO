"use client";
import {
  ChevronLeft,
  CircleCheck,
  Calendar,
  ChevronRight,
  Info,
  ChevronDown,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState, useMemo, forwardRef } from "react";
import garriImg from "@/assets/images/Garri.png";
import Image from "next/image";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

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

const createRoutine = () => {
  const router = useRouter();
  const [selectedFrequency, setSelectedFrequency] = useState("Weekly");

  const [isConsented, setIsConsented] = useState(false);
  const [startDate, setStartDate] = useState(new Date(2026, 0, 17)); // 17th January, 2026

  const [items, setItems] = useState([
    {
      id: 1,
      image: garriImg,
      name: "Fresh Tomatoes",
      unitWeight: 2,
      quantity: 1,
      price: 24.99,
    },
    {
      id: 2,
      image: garriImg,
      name: "Potatoes",
      unitWeight: 5,
      quantity: 2,
      price: 15.5,
    },
    {
      id: 3,
      image: garriImg,
      name: "Onions",
      unitWeight: 1.5,
      quantity: 1,
      price: 10.0,
    },
  ]);

  const [selectedItemId, setSelectedItemId] = useState(items[0].id);

  const selectedItem = useMemo(
    () => items.find((item) => item.id === selectedItemId),
    [items, selectedItemId]
  );

  const updateQuantity = (id: number, delta: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const totalWeight = useMemo(
    () => items.reduce((acc, item) => acc + item.unitWeight * item.quantity, 0),
    [items]
  );

  const estimatedShipping = totalWeight * 5; // Example: $5 per kg

  const totalProductsPrice = useMemo(
    () => items.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [items]
  );

  const totalPerDelivery = totalProductsPrice + estimatedShipping;

  const frequencies = [
    {
      title: "Weekly",
      subtext: "Delivered every 7 days",
    },
    {
      title: "Monthly",
      subtext: "Delivered once every month",
    },
    {
      title: "Yearly",
      subtext: "Delivered once every year",
    },
  ];

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
                onClick={() => setSelectedFrequency(freq.title)}
                className={`flex justify-between items-center border-primary p-2 lg:p-4 rounded-[8px] cursor-pointer border-[0.6px] transition-all duration-200 ${
                  selectedFrequency === freq.title
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
                {selectedFrequency === freq.title && (
                  <CircleCheck className="w-6 lg:w-8 h-6 lg:h-8 text-primary" />
                )}
              </div>
            ))}
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
        <div className="bg-white lg:p-8 p-4 rounded-2xl mt-8 shadow-custom2">
          <h3 className="text-2xl font-semibold mb-4 lg:mb-6">
            Quantity and Order
          </h3>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4">
              <span className="text-lg text-light">Quantity per delivery:</span>
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
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>

                {/* Counter */}
                <div className="flex items-center gap-4 p-2 px-4 rounded-xl ">
                  <button
                    onClick={() => updateQuantity(selectedItemId, -1)}
                    className="p-2 bg-[#EFEEEE] hover:bg-white rounded-md transition-colors"
                  >
                    <ChevronLeft className="w-3 h-3 text-[#363636]" />
                  </button>
                  <span className="text-sm text-[#5A5A5A] min-w-6 text-center">
                    {selectedItem?.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(selectedItemId, 1)}
                    className="p-2 bg-[#EFEEEE] hover:bg-white rounded-md transition-colors"
                  >
                    <ChevronRight className="w-3 h-3 text-[#363636]" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-lg text-light">Unit weight:</span>
              <span className="text-lg text-light">
                {selectedItem?.unitWeight} kg
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-lg text-light">Total weight:</span>
              <span className="text-lg text-light">{totalWeight} kg</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-lg text-light">Estimated shipping:</span>
              <span className="text-lg text-light">
                ${estimatedShipping.toLocaleString()}
              </span>
            </div>
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
                className="flex justify-between items-center text-lg gap-2 text-light"
              >
                <span>
                  {item.name} ({item.quantity}x ${item.price.toFixed(2)})
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}

            <div className="border-b border-[#E5E5E5] my-2"></div>

            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-[#363636]">
                Total Per Delivery
              </span>
              <span className="text-2xl font-bold">
                ${totalPerDelivery.toFixed(2)}
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
          <button className="border border-primary text-primary px-5 h-12 text-lg font-semibold rounded w-full">
            Cancel
          </button>
          <button
            disabled={!isConsented}
            className="bg-primary text-white px-5 h-12 text-lg font-semibold rounded w-full disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
          >
            Create Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default createRoutine;
