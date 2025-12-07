import emptyState from "@/assets/icons/emptyState.svg";
import Image from "next/image";

export default function EmptyCart() {
  return (
    <div className="flex items-center justify-center flex-col">
      <Image
        src={emptyState}
        alt="emptyState"
        className="md:w-[250px] md:h-[200px] w-[164px] h-[156px]"
      />
      <p className="text-[#5A5A5A] text-[18px] leading-7 mt-3 mb-12">
        Your cart is empty
      </p>

      <button className="w-full max-w-[280px] h-12 bg-[#27AE60] rounded-[6px] text-[18px]  leading-7 font-semibold text-white cursor-pointer">
        Continue Shopping
      </button>
    </div>
  );
}
