"use client";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import phone from "@/assets/icons/phone.svg";
import arrowDown from "@/assets/icons/arrow-down.svg";
import usa from "@/assets/icons/flags/usa.svg";
import Image from "next/image";

const countries = [
  { code: "us", label: "United States", flag: usa },
  { code: "fr", label: "France", flag: usa },
  { code: "ng", label: "Nigeria", flag: usa },
];

const languages = [
  { code: "en", label: "English" },
  { code: "fr", label: "French" },
  { code: "yo", label: "Yoruba" },
];

export default function AnnouncementBar() {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

  return (
    <section className="bg-[#0E3D22] w-full">
      <div className="w-full max-w-[1440px] mx-auto md:px-20 px-6 text-[#FFFFFF] py-1.5 flex items-center justify-between md:text-[14px] text-[12px] leading-5 font-medium">
        <div className="flex items-center gap-1">
          <Image src={phone} alt="phone" className="w-4 h-4" />
          <p>
            <span className="hidden">Call</span> +447 223456789
          </p>
        </div>

        <p>🔥 Discount offers</p>

        <div className="flex items-center md:gap-8 gap-2">
          <div className="flex items-center gap-2">
            {/* Flag (always visible) */}
            <Image
              src={selectedCountry.flag}
              width={20}
              height={20}
              alt={selectedCountry.label}
              className="rounded-sm"
            />

            {/* Country Select */}
            <Select
              defaultValue={selectedCountry.code}
              onValueChange={(value) => {
                const lang = countries.find((lang) => lang.code === value);
                if (lang) setSelectedCountry(lang);
              }}
            >
              <SelectTrigger
                className="
        w-fit p-0 h-auto text-sm
        bg-transparent border-none shadow-none 
        focus:ring-0 focus:outline-none
        [&>svg]:hidden [&>span>svg]:hidden
        flex items-center gap-1
      "
              >
                {/* Hide text on mobile, show on md+ */}
                <span className="hidden md:inline">
                  <SelectValue placeholder="Select Country" />
                </span>

                {/* Dropdown arrow */}
              </SelectTrigger>

              <SelectContent>
                {countries.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    <div className="flex items-center gap-2">{lang.label}</div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </section>
  );
}
