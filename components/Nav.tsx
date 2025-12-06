"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type NavItem = {
  name: string;
  href: string;
};

const navItems: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "About Us", href: "/about" },
  { name: "Contact Us", href: "/contact" },
];

export default function Nav() {
  const pathname = usePathname();

  const isActive = (href: string): boolean => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <div className="w-full mx-auto md:px-20 px-6 py-4 h-full hidden items-center justify-center bg-[#FFFFFF] md:flex ">
      <ul className="flex items-center gap-6">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`transition-colors duration-200 hover:text-[#27AE60] px-4 py-2 text-[16px] leading-6 font-medium text-[#5A5A5A] cursor-pointer
                ${
                  isActive(item.href)
                    ? "text-[#27AE60] font-bold underline-offset-4"
                    : "text-gray-800"
                }
              `}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
