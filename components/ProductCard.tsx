import Image from "next/image";
import React from "react";

export default function ProductCard({ product, index }) {
  return (
    <div
      key={index}
      className="rounded-2xl border-[0.6px] border-[#EFEEEE] bg-white shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between min-w-[280px] max-w-[302px] w-full"
    >
      <div className="w-full h-[150px] relative ">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain py-[16.5px] px-[22.5px]"
        />
      </div>

      <div className="p-4">
        <span className="inline-block bg-[#ADFFD0] text-[#2A2A2A] px-3 py-1.5 rounded-full text-[12px] leading-[18px] mb-4 w-fit">
          {product.category}
        </span>

        <div className="mb-4 space-y-2">
          <h3 className="text-[20px] leading-[30px] font-medium text-[#2A2A2A]">
            {product.name}
          </h3>
          <p className="text-[15px] leading-5 text-[#787878] ">
            {product.description}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-[20px] leading-[30px] font-medium text-[#2A2A2A]">
            ${product.price}
          </p>
          <button className="bg-[#27AE60] hover:bg-[#1F8A4E] text-[#FFFFFF] text-[18px] leading-7 font-semibold cursor-pointer px-5 py-2.5 rounded-[6px]">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
