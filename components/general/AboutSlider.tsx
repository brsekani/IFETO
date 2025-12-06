"use client";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay } from "swiper/modules";

import ImageItem from "@/assets/images/Fruits Image.png";
import ImageItem2 from "@/assets/images/Grains Image.png";
import ImageItem3 from "@/assets/images/Garri.png";
import ImageItem4 from "@/assets/images/Protein Image.png";
import ImageItem5 from "@/assets/images/Seafood.png";
import ImageItem6 from "@/assets/images/Spices Image.png";
import Image from "next/image";

const cards = [
  { id: 1, img: ImageItem, text: "Fruits and Vegetables" },
  { id: 2, img: ImageItem2, text: "Grains & Cereals" },
  { id: 3, img: ImageItem4, text: "Proteins" },
  { id: 4, img: ImageItem3, text: "Cassava flakes" },
  { id: 5, img: ImageItem5, text: "Seafood" },
  { id: 6, img: ImageItem6, text: "Spices" },
];

const AboutSlider = () => {
  return (
    <div className="lg:my-12 md:my-8 my-6">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 1000, }}
        speed={4000}
        loop={true}
        spaceBetween={20}
        breakpoints={{
          0: {
            slidesPerView: 2.5,
          },
          768: {
            slidesPerView: 5,
          },
        }}
        className="mySwiper"
      >
        {cards.map((card) => (
          <SwiperSlide className="" key={card.id}>
            <div className="bg-[#E3FFEF] w-auto rounded-2xl py-6 px-8 mx-auto flex flex-col items-center justify-center">
              <Image
                src={card.img}
                alt="item image"
                className="lg:h-20 h-14 object-scale-down object-center"
              />
              <p className="text-center font-semibold mt-1 lg:text-base md:text-[14px] text-xs ">{card.text} </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default AboutSlider;
