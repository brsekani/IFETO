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

export default function ProductImageCarousel() {
  const images = [
    "/images/african-man-harvesting-vegetables.png",
    "/images/african-man-harvesting-vegetables.png",
    "/images/african-man-harvesting-vegetables.png",
  ];

  return (
    <div className="relative max-w-[570px] w-full p-[30px]">
      <Carousel opts={{ loop: true }} className="w-full">
        <CarouselContent>
          {images.map((img, i) => (
            <CarouselItem key={i} className="flex items-center justify-center">
              <div className="">
                <Image
                  src={img}
                  width={372}
                  height={274}
                  alt="Product image"
                  className="object-contain"
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
