import Image from "next/image";
import { Button } from "@/components/ui/button";
import ProductCard from "./ProductCard";
import Link from "next/link";
import { Product } from "@/types/product";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

interface ProductSectionProps {
  title: string;
  link: string;
  products: Product[];
}

export default function ProductSection({
  title,
  products,
  link,
}: ProductSectionProps) {
  return (
    <section className="w-full max-w-[1440px] mx-auto px-6 md:px-20">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[20px] md:text-[32px] md:leading-[38px] leading-[30px] font-semibold text-[#2A2A2A]">
          {title}
        </h2>
        <Link
          href={link}
          className="text-[#27AE60] text-[16px] md:text-[18px] md:leading-7 leading-6 font-medium hover:underline"
        >
          View all
        </Link>
      </div>

      {/* GRID */}
      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView="auto"
        navigation={{
          nextEl: ".swiper-next",
          prevEl: ".swiper-prev",
        }}
        className="w-full"
      >
        {products.map((product, index) => (
          <SwiperSlide
            key={product.id || index}
            className="!w-auto" // allows variable width cards
          >
            <ProductCard product={product} index={index} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
