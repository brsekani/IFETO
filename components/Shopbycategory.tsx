import grain from "@/assets/images/Grains&Cereals.png";
import user from "@/assets/icons/user.svg";
import Image from "next/image";

export default function Shopbycategory() {
  return (
    <section className="w-full max-w-[1440px] mx-auto px-6 md:px-20">
      <div className="flex items-center md:justify-center justify-between mb-6">
        <h1 className="md:text-[32px] text-[20px] md:leading-[38px] leading-[30px] font-semibold text-[#2A2A2A] text-center ">
          Shop by category
        </h1>

        <Image src={user} alt="user" className="block md:hidden" />
      </div>

      {/* Scroll container */}
      <div
        className="
          flex gap-6 overflow-x-auto scrollbar-hide pb-2
          snap-x snap-mandatory 
          scroll-smooth
          touch-pan-x
        "
      >
        {/* Horizontal items */}
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="
              md:w-[257px] w-[124px] md:h-40 h-[87px] bg-[#E3FFEF]
              flex items-center justify-center flex-col gap-2
              rounded-2xl shrink-0
              snap-start
            "
          >
            <Image
              src={grain}
              alt="category"
              className="md:w-[143px] md:h-20 w-[92px] h-[50px] "
            />
            <p className="md:text-[16px] text-[10.03px] md:leading-6 leading-[15.04px] font-semibold text-[#2A2A2A]">
              Grains & Cereals
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
