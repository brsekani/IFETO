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
} from "lucide-react";
import Image from "next/image";
import garriImg from "@/assets/images/Garri.png";
import Link from "next/link";
import CancelRoutineModal from "@/components/modals/CancelRoutineModal";

const page = () => {
  const router = useRouter();
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState<any>(null);

  const [routineOrders, setRoutineOrders] = useState([
    {
      id: 1,
      status: "Active",
      frequency: "Monthly",
      nextDelivery: "17th Jan, 2026",
      totalPrice: "$49.98 USD",
      products: [
        {
          id: 1,
          name: "Yellow Garri",
          unitPrice: "$24.99",
          description: "Qty: 2 Half Paint Bucket (1kg Bucket )",
          totalProductPrice: "$49.98",
          image: garriImg,
        },
        {
          id: 2,
          name: "Yellow Garri",
          unitPrice: "$24.99",
          description: "Qty: 2 Half Paint Bucket (1kg Bucket )",
          totalProductPrice: "$49.98",
          image: garriImg,
        },
      ],
    },
    {
      id: 2,
      status: "Paused",
      frequency: "Monthly",
      nextDelivery: "Paused",
      totalPrice: "$49.98 USD",
      products: [
        {
          id: 1,
          name: "Yellow Garri",
          unitPrice: "$24.99",
          description: "Qty: 2 Half Paint Bucket (1kg Bucket )",
          totalProductPrice: "$49.98",
          image: garriImg,
        },
      ],
    },
  ]);

  const handleToggleStatus = (id: number) => {
    setRoutineOrders((prev) =>
      prev.map((order) => {
        if (order.id === id) {
          const isCurrentlyActive = order.status === "Active";
          return {
            ...order,
            status: isCurrentlyActive ? "Paused" : "Active",
            nextDelivery: isCurrentlyActive ? "Paused" : "17th Jan, 2026",
          };
        }
        return order;
      })
    );
  };
  const handleCancelClick = (order: any) => {
    setOrderToCancel(order);
    setShowCancelModal(true);
  };

  const confirmCancel = () => {
    setRoutineOrders((prev) =>
      prev.filter((order) => order.id !== orderToCancel.id)
    );
    setShowCancelModal(false);
    setOrderToCancel(null);
  };

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

      {routineOrders.map((order) => (
        <div
          key={order.id}
          className="mt-6 bg-white shadow-custom2 rounded-2xl p-4"
        >
          <div className="pt-4">
            <div className="grid lg:gap-6 gap-4 grid-cols-[repeat(auto-fit,minmax(400px,1fr))]">
              {order.products.map((product, idx) => (
                <div key={idx} className="flex gap-3 lg:gap-6">
                  <div className="lg:w-[128px] w-[71px] lg:h-[112px] h-[66px] bg-[#EFEEEE] rounded-[4px] lg:rounded-[6.5px] p-1">
                    <Image
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="lg:space-y-4 space-y-1 w-full">
                    <div className="flex items-center justify-between gap-2">
                      <h2 className="font-semibold text-sm lg:text-lg text-[#5a5a5a]">
                        {product.name}
                      </h2>
                      <h2 className="font-semibold hidden lg:block text-sm lg:text-lg text-[#5a5a5a]">
                        {product.unitPrice}
                      </h2>
                    </div>
                    <h2 className="text-light text-xs lg:text-base ">
                      {product.description}
                    </h2>
                    <h2 className="text-[#5A5A5A] font-semibold lg:font-bold lg:text-xl text-sm lg:text-right ">
                      {product.totalProductPrice}
                    </h2>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-around lg:justify-between gap-2 lg:gap-6 mt-6">
              <div className="lg:w-full">
                <h4 className="text-sm text-light mb-2">Frequency</h4>
                <p className="font-semibold">{order.frequency}</p>
              </div>
              <div className="lg:w-full">
                <h4 className="text-sm text-light mb-2">Next Delivery</h4>
                <p className="font-semibold">{order.nextDelivery}</p>
              </div>
              <div className="lg:w-full">
                <h4 className="text-sm text-light mb-2">Total Price</h4>
                <p className="font-semibold">{order.totalPrice}</p>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 mt-6">
              <div className="flex items-center gap-6">
                <Link
                  href={`/account/routine/edit`}
                  className="md:w-[150px] h-12 bg-primary px-5 rounded-[6px] text-white text-center flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <PencilLine className="w-5 h-5 " />
                  <span className="font-semibold text-lg hidden md:block">
                    Edit
                  </span>
                </Link>

                {order.status === "Active" ? (
                  <button
                    onClick={() => handleToggleStatus(order.id)}
                    className="md:w-[150px] h-12 border border-[#F59E0B] px-5 rounded-[6px] text-[#F59E0B] text-center flex items-center justify-center gap-2.5 cursor-pointer"
                  >
                    <Pause className="w-5 h-5 " />
                    <span className="font-semibold text-lg hidden md:block">
                      Pause
                    </span>
                  </button>
                ) : (
                  <button
                    onClick={() => handleToggleStatus(order.id)}
                    className="md:w-[150px] h-12 border border-primary px-5 rounded-[6px] text-primary text-center flex items-center justify-center gap-2.5 cursor-pointer"
                  >
                    <Play className="w-5 h-5 " />
                    <span className="font-semibold text-lg hidden md:block">
                      Resume
                    </span>
                  </button>
                )}

                <button
                  onClick={() => handleCancelClick(order)}
                  className="md:w-[150px] h-12 border border-[#E53E3E] px-5 rounded-[6px] text-[#E53E3E] text-center flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <Trash2 className="w-5 h-5 " />
                  <span className="font-semibold text-lg hidden md:block">
                    Cancel
                  </span>
                </button>
              </div>

              {order.status === "Active" ? (
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
      ))}

      <CancelRoutineModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={confirmCancel}
        items={
          orderToCancel
            ? orderToCancel.products.map((p: any) => ({
                ...p,
                priceDisplay: p.totalProductPrice,
                description: p.description,
              }))
            : []
        }
      />
    </div>
  );
};

export default page;
