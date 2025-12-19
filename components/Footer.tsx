import Image from "next/image";
import logo from "@/assets/icons/Logo.svg";
import MobilePlayStorebadge from "@/assets/icons/MobilePlayStorebadge.svg";
import MobileAppStorebadge from "@/assets/icons/MobileAppStorebadge.svg";
import x from "@/assets/icons/Tw.svg";
import fb from "@/assets/icons/Fb.svg";
import insta from "@/assets/icons/Ig.svg";
import ln from "@/assets/icons/Ln.svg";
import Link from "next/link";
import { useGetAllCategoriesQuery } from "@/lib/api/categories";
import { useGetAllProductsQuery } from "@/lib/api/products";
import { Category } from "@/types/category";

export default function Footer() {
  const { data, isLoading } = useGetAllCategoriesQuery();

  const categories = data?.data ?? [];
  return (
    <div className="bg-[#0E3D22] text-[#FFFFFF]">
      <div className="max-w-[1440px] mx-auto md:px-20 px-6 md:pt-[100px] pt-10 md:pb-[200px] pb-[100px] space-y-6 ">
        <div className="flex md:flex-row flex-col justify-between gap-8">
          <div className="space-y-8">
            <div className="space-y-4 flex items-center md:items-start flex-col">
              <Image
                src={logo}
                alt="logo"
                className="md:w-[200px] w-[120px] md:h-[132px] h-20"
              />
              <p className="md:max-w-[308px] text-center md:text-start w-full text-[16px] leading-6 text-[#FFFFFF]">
                Connecting African producers with global customers through
                ethical trade and sustainable practices.
              </p>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-3">
              <Image src={MobilePlayStorebadge} alt="" />
              <Image src={MobileAppStorebadge} alt="" />
            </div>
          </div>

          <div className="flex sm:flex-row flex-col xl:gap-20 sm:gap-5 gap-6">
            <div className="md:space-y-6 space-y-4 xl:w-[190px]">
              <h6 className="md:text-[18px] text-[16px] md:leading-7 leading-6 font-semibold">
                Categories
              </h6>
              <ul className="text-[14px] leading-5 text-[#FAFAFA] space-y-4">
                {/* 🔹 Skeleton loader */}
                {isLoading &&
                  Array.from({ length: 10 }).map((_, i) => (
                    <li key={i} className="animate-pulse">
                      <div className="h-4 w-32 bg-white/20 rounded" />
                    </li>
                  ))}

                {/* 🔹 Real categories */}
                {!isLoading &&
                  categories.map((cat: Category) => (
                    <li key={cat.id}>
                      <Link
                        href={`/shop?filters=${encodeURIComponent(cat.id)}`}
                        className="block hover:text-[#41B079] transition"
                      >
                        {cat.name}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>

            <div className="md:space-y-6 space-y-4 xl:w-[190px]">
              <h6 className="md:text-[18px] text-[16px] md:leading-7 leading-6 font-semibold">
                Policy
              </h6>
              <ul className="text-[14px] leading-5 text-[#FAFAFA] space-y-4">
                <li>Terms & Condition</li>
                <li>Return Policy</li>
                <li>Privacy Policy</li>
              </ul>
            </div>

            <div className="md:space-y-6 space-y-4 xl:w-[190px]">
              <h6 className="md:text-[18px] text-[16px] md:leading-7 leading-6 font-semibold">
                Support
              </h6>
              <ul className="text-[14px] leading-5 text-[#FAFAFA] space-y-4">
                <li>FAQ</li>
                <li>Contact</li>
              </ul>
            </div>
          </div>
        </div>

        {/* <hr className=" mt-6 mb-[32.6px] md:block hidden" /> */}

        <div className="flex items-start md:items-center justify-between flex-col gap-6 md:flex-row border-[#EFEEEE] border-t-[0.4px]">
          <div className="md:max-w-[419px] space-y-4 text-[14px] leading-5 pt-8">
            <h6>© 2025 IFETO. All rights reserved.</h6>
            <p>
              All trademarks, logos and brand names are the property of their
              respective owners.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Image src={x} alt="" width={40} height={40} />
            <Image src={fb} alt="" width={40} height={40} />
            <Image src={insta} alt="" width={40} height={40} />
            <Image src={ln} alt="" width={40} height={40} />
          </div>
        </div>
      </div>
    </div>
  );
}
