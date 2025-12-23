"use client";
import Image from "next/image";
import phone from "@/assets/icons/phone.svg";
import { useGetMyCountryQuery } from "@/lib/api/countries";

export default function AnnouncementBar() {
  const { data, isLoading, error } = useGetMyCountryQuery();

  return (
    <section className="bg-[#0E3D22] w-full">
      <div className="w-full max-w-[1440px] mx-auto md:px-20 px-6 text-white py-1.5 flex items-center justify-between md:text-[14px] text-[12px] font-medium">
        <div className="flex items-center gap-1">
          <Image src={phone} alt="phone" className="w-4 h-4" />
          <p>+447 223456789</p>
        </div>

        <p>🔥 Discount offers</p>

        <div className="flex items-center gap-2">
          {isLoading ? (
            <>
              <div className="w-5 h-5 rounded-full bg-white/30 animate-pulse" />

              <div className="hidden md:block w-24 h-3 rounded bg-white/30 animate-pulse" />
            </>
          ) : (
            <>
              <Image
                src={data?.data?.logo}
                width={20}
                height={20}
                alt={data?.data?.name}
                className="object-cover"
              />

              <span className="hidden md:inline">{data?.data?.name}</span>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
