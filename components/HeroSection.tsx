"use client";

import Image from "next/image";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

export default function HeroSection() {
  const slides = [
    {
      title: "Ethically Sourced Natural Goods From Nigeria to the World",
      desc: "Discover pure, sustainably harvested products made with care and delivered directly from Nigerian producers to your doorstep.",
      img: "/images/african-man-harvesting-vegetables.png",
    },
    {
      title: "Pure, Natural, Traceable Ingredients",
      desc: "Shop spices, grains, herbs, and handcrafted goods made with natural methods and full transparency from farm to shipment.",
      img: "/images/african-man-harvesting-vegetables.png",
    },
    {
      title: "Quality You Can Trust, From Verified Vendors",
      desc: "Every item is vetted for safety, freshness, and authenticity — giving you confidence with every order.",
      img: "/images/african-man-harvesting-vegetables.png",
    },
    {
      title: "Global Delivery, Straight From the Source",
      desc: "Experience fast, reliable worldwide delivery powered by modern logistics and ethical sourcing practices.",
      img: "/images/african-man-harvesting-vegetables.png",
    },
  ];

  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section className="w-full bg-[#27AE60] relative overflow-hidden md:h-[540px] h-[476px] ">
      <Carousel
        className="w-full max-w-[1440px] mx-auto h-full"
        setApi={setApi}
      >
        <CarouselContent className="h-full">
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="h-full">
              <div className="grid md:grid-cols-2 items-center h-full gap-10 px-6 py-6 md:py-0 md:px-20">
                {/* LEFT TEXT */}
                <div className="text-[#FFFFFF] md:space-y-6 space-y-4 text-center md:text-start">
                  <h1 className="text-[24px] md:text-[48px] font-semibold md:leading-[60px] leading-8 tracking-[-2%] md:max-w-[570px] max-w-[349px] mx-auto md:mx-0">
                    {slide.title}
                  </h1>

                  <p className="md:text-[24px] text-[14px] md:leading-8 leading-5 md:max-w-[679px] max-w-[322px] mx-auto md:mx-0">
                    {slide.desc}
                  </p>
                </div>

                {/* RIGHT IMAGE */}
                <div className="flex justify-center md:justify-end h-full items-center">
                  <Image
                    src={slide.img}
                    width={540}
                    height={540}
                    alt="Hero"
                    className="object-contain md:max-h-[540px] max-h-[200px]"
                    priority
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="bg-white hover:bg-white/60 text-[#27AE60] w-10 h-10" />
        <CarouselNext className="bg-white hover:bg-white/60 text-[#27AE60] w-10 h-10" />
      </Carousel>

      {/* CLICKABLE DOTS */}
      <div className="flex gap-[3px] justify-center absolute bottom-4 left-0 right-0">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => api?.scrollTo(i)}
            className={`md:w-3 md:h-3 w-2 h-2 rounded-full transition-all 
              ${current === i ? "bg-[#ADFFD0]" : "bg-white"}
            `}
          />
        ))}
      </div>
    </section>
  );
}
