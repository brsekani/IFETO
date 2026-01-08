"use client";

import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { Minus, Plus } from "lucide-react";
import addCircle from "@/assets/icons/add-circle.svg";
import minuscircle from "@/assets/icons/minus-cirlce.svg";
import Image from "next/image";
import { formatPriceKeepSymbol } from "@/utils/formatPrice";

type Props = {
  unitPrice: string;
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
  maxQuantity: number;
};

export default function QuantityBox({
  unitPrice,
  quantity,
  setQuantity,
  maxQuantity,
}: Props) {
  // Extract symbol & numeric value
  const symbol = unitPrice.charAt(0);
  const numericPrice = Number(unitPrice.slice(1));

  const totalPrice = useMemo(() => {
    const total = numericPrice * quantity;
    return formatPriceKeepSymbol(`${symbol}${total}`);
  }, [numericPrice, quantity, symbol]);

  return (
    <div className="flex items-center flex-col md:flex-row gap-4 w-full text-[#2A2A2A] md:mt-[50px] mt-6 md:mb-20 mb-[30px]">
      <div className="w-full">
        <p className="text-[14px] leading-5 mb-1 font-medium">
          Quantity: {`${maxQuantity} left`}
        </p>
        <div className="flex items-center justify-between bg-muted rounded-md px-3 h-14">
          <button
            className="cursor-pointer"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            disabled={quantity <= 1}
          >
            <Image src={minuscircle} alt="-" />
          </button>

          <span className="text-base font-semibold">{quantity}</span>

          <button
            className="cursor-pointer"
            onClick={() => setQuantity((q) => q + 1)}
            disabled={quantity >= maxQuantity}
          >
            <Image src={addCircle} alt="+" />
          </button>
        </div>
      </div>

      <div className="w-full">
        <p className="text-[14px] leading-5 mb-1 font-medium">Total Price</p>
        <div className="h-14 flex items-center px-4 border rounded-md text-base font-semibold">
          {totalPrice}
        </div>
      </div>
    </div>
  );
}
