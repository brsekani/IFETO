"use client";

import { useState } from "react";
import close from "@/assets/icons/Close.svg";
import cabbage from "@/assets/images/cabbage.png";
import trash from "@/assets/icons/trash.svg";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import EmptyCart from "./EmptyCart";

export default function MyCart({ onClose }: { onClose: () => void }) {
  const [cart, setCart] = useState([
    {
      id: 1,
      image: cabbage,
      name: "Fresh Cabbage",
      price: 4.99,
      qty: 1,
      checked: false,
    },
    {
      id: 2,
      image: cabbage,
      name: "Palm nut (Banga)",
      price: 12.13,
      qty: 1,
      checked: false,
    },
    {
      id: 3,
      image: cabbage,
      name: "Fresh Cabbage",
      price: 4.99,
      qty: 1,
      checked: false,
    },
  ]);

  const allChecked = cart.length > 0 && cart.every((item) => item.checked);
  const anyChecked = cart.some((item) => item.checked);

  const toggleItem = (id: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const toggleAll = () => {
    setCart((prev) => prev.map((item) => ({ ...item, checked: !allChecked })));
  };

  const increaseQty = (id: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decreaseQty = (id: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item
      )
    );
  };

  const deleteItem = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Subtotal logic
  const sourceForSubtotal = anyChecked ? cart.filter((i) => i.checked) : cart;
  const subtotal = sourceForSubtotal
    .reduce((sum, item) => sum + Number(item.price) * item.qty, 0)
    .toFixed(2);

  return (
    <div className="flex flex-col h-screen">
      {/* HEADER */}
      <div className="flex items-center justify-between px-6 py-4">
        <h5 className="text-[24px] font-semibold text-[#2A2A2A]">My Cart</h5>
        <Image src={close} alt="close" onClick={onClose} />
      </div>

      {cart.length >= 1 ? (
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
            {cart.map((d) => (
              <div
                key={d.id}
                className="px-6 py-4 flex items-center gap-4 border-b"
              >
                {/* Checkbox + Image */}
                <div className="flex items-center gap-4">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={d.checked}
                      onChange={() => toggleItem(d.id)}
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
                      src={d.image}
                      alt={d.name}
                      className="w-20 h-[58px] object-contain"
                    />
                  </div>
                </div>

                {/* Right section */}
                <div className="flex flex-col flex-1 space-y-[13px]">
                  <p className="font-medium text-[18px] text-[#5A5A5A]">
                    {d.name}
                  </p>
                  <p className="font-semibold text-[20px] text-[#5A5A5A]">
                    ${d.price}
                  </p>

                  {/* Quantity + Delete */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => decreaseQty(d.id)}
                        className="bg-[#EFEEEE] w-6 h-6 flex items-center justify-center rounded"
                      >
                        <ChevronLeft className="w-3 h-3 text-black" />
                      </button>

                      <p className="w-7 h-7 flex items-center justify-center text-center">
                        {d.qty}
                      </p>

                      <button
                        onClick={() => increaseQty(d.id)}
                        className="bg-[#EFEEEE] w-6 h-6 flex items-center justify-center rounded"
                      >
                        <ChevronRight className="w-3 h-3 text-black" />
                      </button>
                    </div>

                    <Image
                      onClick={() => deleteItem(d.id)}
                      src={trash}
                      alt="Delete"
                      className="w-6 h-6 opacity-70 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
            <div className="px-6 py-4 flex items-center justify-end">
              <div className="space-y-2 text-right">
                <p className="text-[14px] text-[#787878]">Subtotal</p>
                <h1 className="text-[24px] text-[#5A5A5A] font-bold">
                  ${subtotal}
                </h1>
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
        <EmptyCart />
      )}
    </div>
  );
}
