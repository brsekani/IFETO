"use client";

import Image from "next/image";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ProductImageCarouselProps {
  images: string[];
}

export default function ProductImageCarousel({
  images,
}: ProductImageCarouselProps) {
  return (
    <div className="relative max-w-[570px] w-full md:p-[30px] px-5 md:py-[89px] py-[60px] border-[0.6px] border-[#EFEEEE] rounded-xl shadow-[0px_4px_24px_0px_#0000000A]">
      <Carousel opts={{ loop: true }} className="w-full">
        <CarouselContent>
          {images.map((img, i) => (
            <CarouselItem key={i} className="flex items-center justify-center">
              <div className="px-[29px]">
                <Image
                  src={img}
                  width={372}
                  height={274}
                  alt="Product image"
                  className="object-contain rounded-2xl"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation buttons */}
        <CarouselPrevious className="left-2 bg-white shadow-md" />
        <CarouselNext className="right-2 bg-white shadow-md" />
      </Carousel>
    </div>
  );
}
