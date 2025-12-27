"use client";

import { useMemo, useState } from "react";
import { Minus, Plus } from "lucide-react";
import addCircle from "@/assets/icons/add-circle.svg";
import minuscircle from "@/assets/icons/minus-cirlce.svg";
import Image from "next/image";

type Props = {
  unitPrice: number; // price per item
  unitWeight: number; // weight per item (kg)
};

export default function QuantityBox({ unitPrice, unitWeight }: Props) {
  const [quantity, setQuantity] = useState(2);

  const totalPrice = useMemo(
    () => (unitPrice * quantity).toFixed(2),
    [unitPrice, quantity]
  );

  const totalWeight = useMemo(
    () => unitWeight * quantity,
    [unitWeight, quantity]
  );

  return (
    <div className="grid grid-cols-3 gap-4 w-full text-[#2A2A2A]">
      {/* Quantity */}
      <div>
        <p className="text-[14px] leading-5 mb-1 font-medium">Quantity</p>
        <div className="flex items-center justify-between bg-muted rounded-md px-3 h-14">
          <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
            <Image src={minuscircle} alt="-" />
          </button>

          <span className="text-base font-semibold">{quantity}</span>

          <button onClick={() => setQuantity((q) => q + 1)}>
            <Image src={addCircle} alt="+" />
          </button>
        </div>
      </div>

      {/* Total Price */}
      <div>
        <p className="text-[14px] leading-5 mb-1 font-medium">Total Price</p>
        <div className="h-14 flex items-center px-4 border rounded-md text-base font-semibold">
          ${totalPrice}
        </div>
      </div>

      {/* Combined Weight */}
      <div>
        <p className="text-[14px] leading-5 mb-1 font-medium">
          Combined Weight (Kg)
        </p>
        <div className="h-14 flex items-center px-4 border rounded-md text-base font-semibold">
          {totalWeight}
        </div>
      </div>
    </div>
  );
}
