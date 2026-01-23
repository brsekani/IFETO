"use client";

import arrow from "@/assets/icons/arrow-right.svg";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import type { NavigationOptions } from "swiper/types";
import "swiper/css";

import { useGetAllCategoriesQuery } from "@/lib/api/categories";
import { useRouter } from "next/navigation";
import { Category } from "@/types/category";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { Navigation } from "swiper/modules";

export default function Shopbycategory() {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const swiperRef = useRef<SwiperType | null>(null);

  const router = useRouter();
  const { data, isLoading } = useGetAllCategoriesQuery();
  const handleCategoryClick = (category: any) => {
    router.push(`/shop?filters=${encodeURIComponent(category.id)}`);
  };

  const categories = data?.data ?? [];

  useEffect(() => {
    if (!swiperRef.current || !prevRef.current || !nextRef.current) return;

    const navigation = swiperRef.current.params.navigation as NavigationOptions;

    navigation.prevEl = prevRef.current;
    navigation.nextEl = nextRef.current;

    swiperRef.current.navigation.destroy();
    swiperRef.current.navigation.init();
    swiperRef.current.navigation.update();
  }, []);

  return (
    <section className="w-full max-w-[1440px] mx-auto px-6 md:px-20">
      <div className="flex items-center md:justify-center justify-between mb-6">
        <h1 className="md:text-[32px] text-[20px] md:leading-[38px] leading-[30px] font-semibold text-[#2A2A2A] text-center">
          Shop by category
        </h1>

        <Image src={arrow} alt="arrow" className="block md:hidden" />
      </div>

      {/* Swiper */}
      <div className="relative w-full">
        {/* Left Button */}
        <button
          ref={prevRef}
          className="
      absolute left-0 top-1/2 z-10 -translate-y-1/2
      bg-white shadow-md rounded-full p-2
      hover:bg-gray-100 transition md:block hidden
    "
        >
          <ChevronLeft className="w-5 h-5 text-[#2A2A2A]" />
        </button>

        {/* Right Button */}
        <button
          ref={nextRef}
          className="
      absolute right-0 top-1/2 z-10 -translate-y-1/2
      bg-white shadow-md rounded-full p-2
      hover:bg-gray-100 transition md:block hidden
    "
        >
          <ChevronRight className="w-5 h-5 text-[#2A2A2A]" />
        </button>

        <Swiper
          modules={[Navigation]}
          spaceBetween={16}
          slidesPerView="auto"
          grabCursor
          onBeforeInit={(swiper) => {
            // @ts-ignore
            swiper.params.navigation.prevEl = prevRef.current;
            // @ts-ignore
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          className="
      flex gap-6 overflow-x-auto scrollbar-hide pb-2
      snap-x snap-mandatory 
      scroll-smooth
      touch-pan-x
      -mr-6 md:-mr-20
    "
        >
          {/* 🔹 Skeleton loader */}
          {isLoading &&
            Array.from({ length: 6 }).map((_, i) => (
              <SwiperSlide
                key={i}
                className="!w-[124px] md:!w-[257px] shrink-0"
              >
                <div className="w-full md:h-40 h-[87px] bg-[#F2F2F2] rounded-2xl flex flex-col items-center justify-center gap-3 animate-pulse">
                  <div className="md:w-[143px] md:h-20 w-[92px] h-[50px] bg-gray-300 rounded-md" />
                  <div className="w-16 md:w-24 h-3 bg-gray-300 rounded" />
                </div>
              </SwiperSlide>
            ))}

          {/* 🔹 Real categories */}
          {!isLoading &&
            categories.map((category: Category) => (
              <SwiperSlide
                key={category.id}
                className="!w-[124px] md:!w-[257px] shrink-0 cursor-pointer"
              >
                <div
                  className="
              w-full md:h-40 h-[87px] bg-[#E3FFEF]
              flex items-center justify-center flex-col gap-2
              rounded-2xl
            "
                  onClick={() => handleCategoryClick(category)}
                >
                  <div className="rounded overflow-hidden bg-[#EFEEEE] flex items-center justify-center">
                    <Image
                      src={category.image}
                      alt={category.name}
                      width={143}
                      height={80}
                      className="object-contain"
                    />
                  </div>

                  <p className="md:text-[16px] text-[10.03px] font-semibold text-[#2A2A2A] text-center line-clamp-1">
                    {category.name}
                  </p>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </section>
  );
}
