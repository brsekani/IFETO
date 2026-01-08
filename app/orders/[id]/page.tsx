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

import { useParams } from "next/navigation";
import { useGetOrderByIdQuery } from "@/lib/api/orders";
import { format } from "date-fns";

const OrderDetails = () => {
  const { id } = useParams();
  const {
    data: orderResponse,
    isLoading,
    error,
  } = useGetOrderByIdQuery(id as string);

  console.log(orderResponse?.data);

  if (isLoading) {
    return (
      <div className="w-full lg:py-7 lg:px-20 md:px-14 px-6 pb-10 bg-[#FAFAFA] min-h-screen flex justify-center items-center">
        <div className="w-full max-w-[1440px] space-y-6 animate-pulse">
          <div className="h-8 w-40 bg-gray-200 rounded" />
          <div className="h-64 bg-gray-200 rounded-2xl" />
          <div className="h-96 bg-gray-200 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (error || !orderResponse?.data) {
    return (
      <div className="w-full lg:py-7 lg:px-20 md:px-14 px-6 pb-10 bg-[#FAFAFA] min-h-screen flex flex-col justify-center items-center">
        <p className="text-xl font-semibold text-[#EB5757]">
          Order not found or error loading details.
        </p>
        <Link
          href="/orders"
          className="mt-4 px-6 py-2 bg-primary text-white rounded-md"
        >
          Back to Orders
        </Link>
      </div>
    );
  }

  const order = orderResponse.data;

  // Derive tracking steps from status
  const getTrackingSteps = (status: string) => {
    const steps = [
      {
        status: "Order Placed",
        date: order.createdAt
          ? format(new Date(order.createdAt), "MMM d, yyyy")
          : "N/A",
        completed: true,
      },
      {
        status: "Verified & Packed",
        date: order.createdAt
          ? format(new Date(order.createdAt), "MMM d, yyyy")
          : "N/A",
        completed: true,
      },
      {
        status: "Shipped from warehouse",
        date: "Pending",
        completed: status === "SHIPPED" || status === "DELIVERED",
      },
      {
        status: "Arrived US Sorting Centre",
        date: "Pending",
        completed: status === "DELIVERED",
      },
      {
        status: "Out for delivery",
        date: "Pending",
        completed: status === "DELIVERED",
      },
      {
        status: "Delivered",
        date: "Pending",
        completed: status === "DELIVERED",
      },
    ];
    return steps;
  };

  const trackingSteps = getTrackingSteps(order.status || "");

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "bg-[#F3E8FF] text-[#9333EA]";
      case "processing":
      case "pending":
        return "bg-[#FFF8E6] text-[#F2C94C]";
      case "shipped":
        return "bg-[#E6F7FF] text-[#2F80ED]";
      case "cancelled":
        return "bg-[#FFEEEE] text-[#EB5757]";
      default:
        return "bg-[#FFF8E6] text-[#F2C94C]";
    }
  };

  const subtotal = order.subtotal;
  const shippingFee = order.deliveryFee;

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
                <h1 className="lg:text-2xl text-xl font-bold text-dark mb-1 font-nunito">
                  Order #{order.id.slice(0, 8)}
                </h1>
                <p className="lg:text-lg text-light font-nunito">
                  Placed on{" "}
                  {order.createdAt
                    ? format(new Date(order.createdAt), "MMM d, yyyy")
                    : "N/A"}
                </p>
              </div>
              <span
                className={`${getStatusColor(
                  order.status || order.paymentStatus
                )} px-4 py-1.5 rounded-full text-xs lg:text-base font-semibold font-nunito`}
              >
                {order.status || order.paymentStatus}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <div className="flex flex-col lg:flex-row items-stretch lg:items-start lg:justify-between gap-0 lg:gap-4 min-w-fit mx-auto">
                {trackingSteps.map((step, index) => {
                  const nextStep = trackingSteps[index + 1];
                  const isConnectorActive = nextStep?.completed;

                  return (
                    <Fragment key={index}>
                      <div className="flex flex-row lg:flex-col items-stretch lg:items-center gap-4 lg:gap-3 relative z-10 w-full lg:w-max lg:max-w-[120px]">
                        <div className="flex flex-col items-center">
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

                          {index !== trackingSteps.length - 1 && (
                            <div
                              className={`lg:hidden w-[2px] flex-grow -my-1 pb-2 transition-colors duration-300 ${
                                isConnectorActive ? "bg-primary" : "bg-light"
                              }`}
                            />
                          )}
                        </div>

                        <div className="flex flex-col items-start lg:items-center text-left lg:text-center w-max pb-8 lg:pb-0 font-nunito">
                          <p
                            className={`font-semibold text-base ${
                              step.completed ? "text-dark" : "text-light"
                            }`}
                          >
                            {step.status}
                          </p>
                          <p className="text-sm text-light mt-0.5 whitespace-nowrap">
                            {step.date}
                          </p>
                        </div>
                      </div>

                      {index !== trackingSteps.length - 1 && (
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
            <h2 className="text-lg lg:text-2xl font-semibold lg:font-bold text-dark mb-4 font-nunito">
              Product Summary
            </h2>
            <div className="space-y-4 font-nunito">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-4 items-center p-2 lg:py-5 lg:px-6 border-b border-[#EFEEEE]"
                >
                  <div className="relative w-20 h-20 lg:w-[112px] lg:h-[112px] bg-[#EFEEEE] rounded lg:rounded-lg shrink-0 border border-gray-100">
                    <Image
                      src={item.product?.images?.[0] || ""}
                      alt={item.product?.name || "Product"}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                  <div className="flex-1 lg:space-y-4 space-y-1">
                    <div className="flex items-center justify-between w-full">
                      <h3 className="font-semibold text-dark text-sm lg:text-lg">
                        {item.product?.name}
                      </h3>
                      <p className="text-sm lg:text-lg font-medium text-light">
                        {order.currencySymbol || "$"}
                        {item.priceAtTime.toFixed(2)}
                      </p>
                    </div>
                    <p className="text-xs lg:text-base text-light">
                      Qty: {item.quantity}
                    </p>
                    <p className="font-bold text-dark text-right text-base lg:text-xl">
                      {order.currencySymbol || "$"}
                      {(item.priceAtTime * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 lg:mt-6 bg-[#E3FFEF] rounded-[8px] p-4 lg:py-5 lg:px-6 font-nunito">
              <h2 className="lg:text-2xl text-lg font-semibold text-dark mb-2 lg:mb-4">
                Weight Breakdown
              </h2>
              <div className="space-y-4 border-b border-primary ">
                <div className="lg:py-1 py-0.5 flex justify-between items-center">
                  <p className="text-light text-sm lg:text-base">
                    Total Weight
                  </p>
                  <p className="lg:text-xl text-base font-bold text-[#5A5A5A]">
                    {order.totalWeight}kg
                  </p>
                </div>
              </div>
              <div className="py-1 flex justify-between items-center lg:mt-4 mt-2.5 ">
                <p className="text-light text-sm lg:text-base">Note</p>
                <p className="lg:text-xl text-base font-bold text-[#5A5A5A]">
                  Measured Total Order Weight
                </p>
              </div>
            </div>
          </div>

          {/* Card 3: Delivery Info */}
          <div className="bg-white rounded-2xl lg:p-6 p-4 shadow-custom2 font-nunito">
            <h2 className="text-lg lg:text-2xl font-semibold mb-4 lg:mb-6 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-light" />
              Delivery Information
            </h2>
            <div className="space-y-4">
              <div>
                <p className="lg:text-sm text-xs text-light mb-2">Address</p>
                <p className="lg:text-base text-sm font-semibold">
                  {order.deliveryAddress
                    ? `${order.deliveryAddress.address1}, ${order.deliveryAddress.city}, ${order.deliveryAddress.state}, ${order.deliveryAddress.country}`
                    : "Not specified"}
                </p>
              </div>
              <div>
                <p className="lg:text-sm text-xs text-light mb-2">Label</p>
                <p className="lg:text-base text-sm font-semibold">
                  {order.deliveryAddress?.label || "Home"}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl lg:p-6 p-4 shadow-custom2 font-nunito">
            <h2 className="lg:text-2xl text-lg font-semibold mb-6 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-light" />
              Payment Summary
            </h2>
            <div className="lg:space-y-4 space-y-2 lg:py-2 py-0.5 border-b border-[#EFEEEE]">
              <div className="flex justify-between">
                <span className="text-light lg:text-sm text-xs">Subtotal</span>
                <span className="text-dark font-semibold lg:text-base text-sm">
                  {order.currencySymbol || "$"}
                  {order.subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-light lg:text-sm text-xs">
                  Shipping Fee
                </span>
                <span className="text-dark font-semibold lg:text-base text-sm">
                  {order.currencySymbol || "$"}
                  {order.deliveryFee.toFixed(2)}
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center pt-4">
              <span className="font-semibold lg:text-lg text-base">
                Grand Total
              </span>
              <span className="lg:text-xl text-lg font-bold ">
                {order.currencySymbol || "$"}
                {order.totalAmountPaid.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
