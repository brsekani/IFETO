import grain from "@/assets/images/Grains&Cereals.png";
import user from "@/assets/icons/user.svg";
import arrow from "@/assets/icons/arrow-right.svg";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

import ImageItem from "@/assets/images/Fruits Image.png";
import ImageItem2 from "@/assets/images/Grains Image.png";
import ImageItem3 from "@/assets/images/Garri.png";
import ImageItem4 from "@/assets/images/Protein Image.png";
import ImageItem5 from "@/assets/images/Seafood.png";
import ImageItem6 from "@/assets/images/Spices Image.png";

export default function Shopbycategory() {
  const cards = [
    { id: 1, img: ImageItem, text: "Fruits and Vegetables" },
    { id: 2, img: ImageItem2, text: "Grains & Cereals" },
    { id: 3, img: ImageItem4, text: "Proteins" },
    { id: 4, img: ImageItem3, text: "Cassava flakes" },
    { id: 5, img: ImageItem5, text: "Seafood" },
    { id: 6, img: ImageItem6, text: "Spices" },
  ];

  return (
    <section className="w-full max-w-[1440px] mx-auto px-6 md:px-20">
      <div className="flex items-center md:justify-center justify-between mb-6">
        <h1 className="md:text-[32px] text-[20px] md:leading-[38px] leading-[30px] font-semibold text-[#2A2A2A] text-center ">
          Shop by category
        </h1>

        <Image src={arrow} alt="user" className="block md:hidden" />
      </div>

      {/* Scroll container */}
      <Swiper
        spaceBetween={16}
        slidesPerView={"auto"}
        grabCursor={true}
        className="
          flex gap-6 overflow-x-auto scrollbar-hide pb-2
          snap-x snap-mandatory 
          scroll-smooth
          touch-pan-x
          -mr-6 md:-mr-20
        "
      >
        {/* Horizontal items */}
        {cards.map((card, i) => (
          <SwiperSlide
            key={i}
            className="
              !w-[124px] md:!w-[257px]
              shrink-0
            "
          >
            <div
              className="
                w-full md:h-40 h-[87px] bg-[#E3FFEF]
                flex items-center justify-center flex-col gap-2
                rounded-2xl
              "
            >
              <Image
                src={card.img}
                alt="category"
                className="md:w-[143px] md:h-20 w-[92px] h-[50px]"
              />

              <p className="md:text-[16px] text-[10.03px] font-semibold text-[#2A2A2A]">
                {card.text}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
