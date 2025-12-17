"use client";

import { Fragment } from "react";
import {
  ChevronLeft,
  Check,
  Copy,
  CircleCheck,
  MapPin,
  CreditCard,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import garriImg from "@/assets/images/Garri.png";
import cabbageImg from "@/assets/images/cabbage.png";

const OrderDetails = () => {
  // Mock data for the detailed view
  const order = {
    id: "789012",
    date: "Dec 15, 2025",
    status: "Processing",
    weightCategory: "Air Cargo – 1kg to 5kg",
    totalWeight: "4.8kg",
    shippingRate: "$9.00/kg",
    totalWeightFee: "4.8 kg × 9$ = $43.2",
    items: [
      {
        name: "Garri",
        image: garriImg,
        price: 50.0,
        quantity: 2,
        weight: "2.5kg",
      },
      {
        name: "Cabbage",
        image: cabbageImg,
        price: 25.5,
        quantity: 1,
        weight: "1.0kg",
      },
    ],
    weightBreakdown: "Weight calculated based on volumetric weight of items.",
    shipping: {
      recipient: "Alex Johnson",
      address: "123, Main Street, Lagos, Nigeria",
      phoneNumber: "+234 812 345 6789",
      emailAddress: "alex.j@example.com",
      method: "Standard Shipping",
      deliveryMethod: "Door Delivery",
      trackingNumber: "TRK-890123456",
      estimatedDelivery: "Dec 22, 2025",
    },
    payment: {
      subtotal: 125.5,
      shippingFee: 15.0,
      tax: 7.5,
      total: 148.0,
      method: "Credit Card (**** 1234)",
    },
    trackingSteps: [
      {
        status: "Order Placed",
        date: "Dec 15, 2025",
        time: "10:30 AM",
        completed: true,
      },
      {
        status: "Verified & Packed",
        date: "Dec 16, 2025",
        time: "02:15 PM",
        completed: true,
      },
      {
        status: "Shipped from warehouse",
        date: "Dec 17, 2025",
        time: "09:45 AM",
        completed: false,
      },
      {
        status: "Arrived US Sorting Centre",
        date: "Pending",
        time: "--:--",
        completed: false,
      },
      {
        status: "Out for delivery",
        date: "Pending",
        time: "--:--",
        completed: false,
      },
      {
        status: "Delivered",
        date: "Pending",
        time: "--:--",
        completed: false,
      },
    ],
  };

  return (
    <div className="w-full lg:py-7 lg:px-20 md:px-14 px-6 pb-10 bg-[#FAFAFA] min-h-screen">
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Link
            href="/orders"
            className="flex items-center gap-2 text-[#5A5A5A] hover:text-primary transition-colors font-semibold w-fit"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Back to orders</span>
          </Link>
        </div>

        <div className="space-y-6">
          {/* Card 1: Status & Tracking */}
          <div className="bg-white rounded-2xl p-6 shadow-custom2">
            <div className="flex justify-between items-start lg:mb-3 mb-4">
              <div>
                <h1 className="lg:text-2xl text-xl font-bold text-dark mb-1">
                  Order #{order.id}
                </h1>
                <p className="lg:text-lg  text-light">Placed on {order.date}</p>
              </div>
              <span className="bg-[#FFF8E6] text-[#F2C94C] px-4 py-1.5 rounded-full text-xs lg:text-base font-semibold">
                {order.status}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {/* Container for the steps */}
              <div className="flex flex-col lg:flex-row items-stretch lg:items-start lg:justify-between gap-0 lg:gap-4 min-w-fit mx-auto">
                {order.trackingSteps.map((step, index) => {
                  const nextStep = order.trackingSteps[index + 1];
                  const isConnectorActive = nextStep?.completed;

                  return (
                    <Fragment key={index}>
                      {/* Step Container */}
                      <div className="flex flex-row lg:flex-col items-stretch lg:items-center gap-4 lg:gap-3 relative z-10 w-full lg:w-max lg:max-w-[120px]">
                        {/* Circle + Mobile Connector Column */}
                        <div className="flex flex-col items-center">
                          {/* Circle */}
                          <div
                            className={`w-8 lg:w-14 h-8 lg:h-14 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300 border-2 z-10 relative ${
                              step.completed
                                ? "bg-primary border-primary text-white"
                                : "bg-[#CFCFCF] text-gray-400"
                            }`}
                          >
                            {step.completed ? (
                              <CircleCheck className="w-4 h-4 lg:w-8 lg:h-8" />
                            ) : (
                              <div className="w-3 h-3 lg:w-6 lg:h-6 rounded-full bg-white" />
                            )}
                          </div>

                          {/* Mobile Connector (Vertical) - Grows to fill space to next step */}
                          {index !== order.trackingSteps.length - 1 && (
                            <div
                              className={`lg:hidden w-[2px] flex-grow -my-1 pb-2 transition-colors duration-300 ${
                                isConnectorActive ? "bg-primary" : "bg-light"
                              }`}
                            />
                          )}
                        </div>

                        {/* Text Details */}
                        <div className="flex flex-col items-start lg:items-center text-left lg:text-center w-max pb-8 lg:pb-0">
                          <p
                            className={`font-semibold text-base ${
                              step.completed ? "text-dark" : "text-light"
                            } `}
                          >
                            {step.status}
                          </p>
                          <p className="text-sm text-light mt-0.5">
                            {step.date}
                          </p>
                          {step.time && (
                            <p className="text-xs text-light/80">{step.time}</p>
                          )}
                        </div>
                      </div>

                      {/* Desktop Connector Line (Sibling) */}
                      {index !== order.trackingSteps.length - 1 && (
                        <div
                          className={`hidden lg:block w-[40px] h-[2px] mt-7 shrink-0 transition-colors duration-300 ${
                            isConnectorActive ? "bg-primary" : "bg-light"
                          }`}
                        />
                      )}
                    </Fragment>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Card 2: Product Summary */}
          <div className="bg-white rounded-2xl lg:p-6 p-4 shadow-custom2 mt-4">
            <h2 className="text-lg lg:text-2xl font-semibold lg:font-bold text-dark mb-4">
              Product Summary
            </h2>
            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex gap-4 items-center p-2 lg:py-5 lg:px-6 border-b border-[#EFEEEE]">
                  <div className="relative w-20 h-20 lg:w-[112px] lg:h-[112px] bg-[#EFEEEE] rounded lg:rounded-lg shrink-0 border border-gray-100">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                  <div className="flex-1 lg:space-y-4 space-y-1">
                    <div className="flex items-center justify-between w-full">
                      <h3 className="font-semibold text-dark text-sm lg:text-lg">
                        {item.name}
                      </h3>
                      <p className="text-sm lg:text-lg font-medium">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                    <p className="text-xs lg:text-base text-light">Qty: {item.quantity}</p>
                    <p className="font-bold text-dark text-right text-base lg:text-xl">
                      ${(item.quantity * item.price).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 lg:mt-6 bg-[#E3FFEF] rounded-[8px] p-4 lg:py-5 lg:px-6">
              <h2 className="lg:text-2xl text-lg font-semibold text-dark mb-2 lg:mb-4">
                Weight Breakdown
              </h2>
              <div className="space-y-4 border-b border-primary ">
                <div className="lg:py-1 py-0.5 flex justify-between items-center">
                  <p className="text-light text-sm lg:text-base">Weight Category</p>
                  <p className="lg:text-xl text-base font-bold text-[#5A5A5A]">
                    {order.weightCategory}
                  </p>
                </div>
                <div className="lg:py-1 py-0.5 flex justify-between items-center">
                  <p className="text-light text-sm lg:text-base">Total Weight</p>
                  <p className="lg:text-xl text-base font-bold text-[#5A5A5A]">
                    {order.totalWeight}
                  </p>
                </div>
                <div className="lg:py-1 py-0.5 flex justify-between items-center pb-2">
                  <p className="text-light text-sm lg:text-base">Shipping Rate</p>
                  <p className="lg:text-xl text-base font-bold text-[#5A5A5A]">
                    {order.shippingRate}
                  </p>
                </div>
              </div>
              <div className="py-1 flex justify-between items-center lg:mt-4 mt-2.5 ">
                <p className="text-light text-sm lg:text-base">Total Weight Fee</p>
                <p className="lg:text-xl text-base font-bold text-[#5A5A5A]">
                  {order.totalWeightFee}
                </p>
              </div>
            </div>
          </div>

          {/* Card 3: Delivery Info */}
          <div className="bg-white rounded-2xl lg:p-6 p-4 shadow-custom2">
            <h2 className="text-lg lg:text-2xl font-semibold mb-4 lg:mb-6 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-light" />
              Delivery Information
            </h2>
            <div className="space-y-4">
              <div>
                <p className="lg:text-sm text-xs text-light mb-2">Recipient</p>
                <p className="lg:text-base text-sm font-semibold">
                  {order.shipping.recipient}
                </p>
              </div>
              <div>
                <p className="lg:text-sm text-xs text-light mb-2">Address</p>
                <p className="lg:text-base text-sm font-semibold">
                  {order.shipping.address}
                </p>
              </div>
              <div>
                <p className="lg:text-sm text-xs text-light mb-2">Phone Number</p>
                <p className="lg:text-base text-sm font-semibold">
                  {order.shipping.phoneNumber}
                </p>
              </div>
              <div>
                <p className="lg:text-sm text-xs text-light mb-2">Email Address</p>
                <p className="lg:text-base text-sm font-semibold">
                  {order.shipping.emailAddress}
                </p>
              </div>
              <div>
                <p className="lg:text-sm text-xs text-light mb-2">Delivery Method</p>
                <p className="lg:text-base text-sm font-semibold">
                  {order.shipping.deliveryMethod}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl lg:p-6 p-4 shadow-custom2">
            <h2 className="lg:text-2xl text-lg font-semibold mb-6 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-light" />
              Payment Summary
            </h2>
            <div className="lg:space-y-4 space-y-2 lg:py-2 py-0.5 border-b border-[#EFEEEE]">
              <div className="flex justify-between">
                <span className="text-light lg:text-sm text-xs">Product cost</span>
                <span className="text-dark font-semibold lg:text-base text-sm">
                  ${order.payment.subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-light lg:text-sm text-xs">Shipping Fee</span>
                <span className="text-dark font-semibold lg:text-base text-sm">
                  ${order.payment.shippingFee.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-light lg:text-sm text-xs">Tax</span>
                <span className="text-dark font-semibold lg:text-base text-sm">
                  ${order.payment.tax.toFixed(2)}
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center pt-4">
              <span className="font-semibold lg:text-lg text-base">Grand Total</span>
              <span className="lg:text-xl text-lg font-bold ">
                ${order.payment.total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
