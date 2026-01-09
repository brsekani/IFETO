"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import arrowRight from "@/assets/icons/arrow-right1.svg";
import Image from "next/image";
import verify from "@/assets/images/verify.png";
import { CircleCheck, MapPin, Box, CreditCard } from "lucide-react";
import { Fragment } from "react";
import garriImg from "@/assets/images/Garri.png";
import cabbageImg from "@/assets/images/cabbage.png";

export default function SuccessPage() {
  const params = useSearchParams();
  const sessionId = params.get("session_id");

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
    <div className="bg-[#FAFAFA]">
      <div className="max-w-[1440px] w-full mx-auto px-6 md:px-20 pt-6 pb-20">
        <div className="flex">
          <Link
            href={"/"}
            className="py-2 px-4 text-[16px] leading-6 font-semibold text-[#5A5A5A]"
          >
            Home
          </Link>
          <Image src={arrowRight} alt="arrowRight" />
          <Link
            href={``}
            className="py-2 px-4 text-[16px] leading-6 font-semibold text-[#5A5A5A] text-nowrap truncate"
          >
            My Cart
          </Link>

          <Image src={arrowRight} alt="arrowRight" />
          <div className="py-2 px-4 text-[16px] leading-6 font-semibold text-[#27AE60] text-nowrap truncate">
            Checkout
          </div>
        </div>

        <div className="mt-8 lg:mt-14 mb-6">
          <div className="flex items-center flex-col gap-6">
            <Image
              src={verify}
              alt="verify-logo"
              className="w-[150px] h-[150px]"
            />

            <p className="font-semibold md:text-[32px] leading-[30px] text-[20px] text-[#27AE60]">
              Order Completed!
            </p>

            <p className="text-[#606060] md:text-[24px] md:leading-2.5 text-[16px] leading-6">
              Thank you for your. Your order has been confirmed and will soon be
              shipped.
            </p>
          </div>
          <div className="lg:mt-16 mt-6 shadow-custom2 p-4 lg:p-6 rounded-2xl bg-white">
            <h2 className="lg:text font-semibold">Order Receipt</h2>
            <div className="lg:mt-4 mt-2.5">
              <div className="flex gap-3 items-center">
                <span className="text-light text-xs lg:text-lg">Order ID:</span>
                <span className="text-[#363636] text-xs lg:text-lg font-medium">
                  #123456789
                </span>
              </div>
              <div className="flex gap-3 items-center mt-2">
                <span className="text-light text-xs lg:text-lg">Date:</span>
                <span className="text-[#363636] text-xs lg:text-lg font-medium">
                  December 14, 2025
                </span>
              </div>
              <div className="flex gap-3 items-center mt-2">
                <span className="text-light text-xs lg:text-lg">Email:</span>
                <span className="text-[#363636] text-xs lg:text-lg font-medium">
                  Halimah.balogun@gmail.com
                </span>
              </div>
              <div className="flex gap-3 items-center mt-2">
                <span className="text-light text-xs lg:text-lg">
                  Payment Status:
                </span>
                <span className="text-[#363636] text-xs lg:text-lg font-medium">
                  Successful
                </span>
              </div>
              <div className="flex gap-3 items-center mt-2">
                <span className="text-light text-xs lg:text-lg">Currency:</span>
                <span className="text-[#363636] text-xs lg:text-lg font-medium">
                  USD ($)
                </span>
              </div>
              <div className="flex gap-3 items-center mt-2">
                <span className="text-light text-xs lg:text-lg">
                  Total Amount:
                </span>
                <span className="text-[#363636] text-xs lg:text-lg font-medium">
                  $118.7
                </span>
              </div>
              <div className="flex gap-3 items-center mt-2">
                <span className="text-light text-xs lg:text-lg">
                  Payment Method:
                </span>
                <span className="text-[#363636] text-xs lg:text-lg font-medium">
                  Stripe
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Card 1: Status & Tracking */}
          <div className="bg-white rounded-2xl p-6 shadow-custom2">
            <div className="flex justify-between items-start lg:mb-3 mb-4">
              <h1 className="lg:text-2xl text-xl font-bold text-dark mb-1">
                Order Tracking
              </h1>

              {/* <span className="bg-[#FFF8E6] text-[#F2C94C] px-4 py-1.5 rounded-full text-xs lg:text-base font-semibold">
                {order.status}
              </span> */}
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
                                ? "bg-[#34C759] border-[#34C759] text-white"
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
                                isConnectorActive ? "bg-[#34C759]" : "bg-light"
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
                            isConnectorActive ? "bg-[#34C759]" : "bg-light"
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
                <div
                  key={index}
                  className="flex gap-4 items-center p-2 lg:py-5 lg:px-6 border-b border-[#EFEEEE]"
                >
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
                    <p className="text-xs lg:text-base text-light">
                      Qty: {item.quantity}
                    </p>
                    <p className="font-bold text-dark text-right text-base lg:text-xl">
                      ${(item.quantity * item.price).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 3: Delivery Info */}
          <div className="bg-white rounded-2xl lg:p-6 p-4 shadow-custom2">
            <h2 className="text-lg lg:text-2xl font-semibold mb-4 lg:mb-6 flex items-center gap-2">
              Delivery Details
            </h2>
            <div className="space-y-4">
              <h6>Halimah Balogun</h6>
              <p>
                742 Meadowbrook Lane Suite, 204 Fairfield, Ohio 45014, United
                States
              </p>
              <p>Halimah.balogun@gmail.com</p>
              <p>+1 (458) 742-1930</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
