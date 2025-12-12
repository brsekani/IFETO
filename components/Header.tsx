"use client";

import logo from "@/assets/icons/Logo.svg";
import cart from "@/assets/icons/cart.svg";
import user from "@/assets/icons/user.svg";
import arrowDown from "@/assets/icons/arrow-down-black.svg";
import usa from "@/assets/icons/flags/usa.svg";
import menu from "@/assets/icons/menu.svg";
import search from "@/assets/icons/search-normal.svg";
import box from "@/assets/icons/box.svg";
import location from "@/assets/icons/location.svg";
import logout from "@/assets/icons/logout.svg";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import greenArrowDown from "@/assets/icons/green-arrow-down.svg";
import { useState } from "react";
import RightDrawer from "./RightDrawer";
import MyCart from "./MyCart";
import MenuDrawer from "./MenuDrawer";
import MyAccountDrawer from "./MyAccountDrawer";

const items = [
  { label: "My Order", icon: box },
  { label: "My Account", icon: user },
  { label: "Address", icon: location },
];

export default function Header() {
  // const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [openCart, setOpenCart] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const numberOfItemsInCart = 0;

  return (
    <section className="bg-[#FAFAFA] w-full">
      <div className="max-w-[1440px] w-full mx-auto md:px-20 px-6 py-2 h-full flex items-center justify-between gap-4">
        <Image
          src={logo}
          alt={logo}
          className="md:w-[84px] md:h-[55px] w-12 h-8"
        />

        <form className="max-w-[615px] w-full md:flex hidden items-center text-[14px] leading-5">
          <input
            className="w-full bg-white h-12 rounded-l-3xl px-6 border-[0.5px]"
            placeholder="Search for grains, protein,  seafood, fruits etc....."
          />
          <button className="w-[74px] h-12 bg-[#27AE60] rounded-r-3xl  font-semibold text-[#FFFFFF] cursor-pointer">
            Search
          </button>
        </form>

        <div className="flex items-center md:gap-12 gap-4">
          <Image
            src={search}
            alt={search}
            className="w-6 h-6 md:w-5 md:h-5 block md:hidden"
          />
          <div className="flex items-center gap-2">
            {/* Flag (always visible) */}
            <Image
              src={user}
              alt={user}
              className="w-6 h-6 md:w-5 md:h-5 block md:hidden"
              onClick={() => setOpenProfile(true)}
            />

            <Image
              src={user}
              alt={user}
              className="w-6 h-6 md:w-5 md:h-5 hidden md:block"
              // onClick={() => setOpenProfile(true)}
            />

            <DropdownMenu modal={false}>
              {/* TRIGGER */}
              <DropdownMenuTrigger className="md:flex hidden items-center gap-1 bg-transparent text-sm outline-none border-none">
                <span className="hidden md:inline text-[#2A2A2A]">
                  Elizabeth Odiai
                </span>

                <Image src={arrowDown} alt="arrow" width={18} height={18} />
              </DropdownMenuTrigger>

              {/* CONTENT */}
              <DropdownMenuContent
                align="end"
                className="
          w-60 bg-white rounded-xl shadow-[0_4px_30px_rgba(0,0,0,0.1)]
          py-4 border-none
        "
              >
                {/* Menu Items */}
                <div className="flex flex-col gap-4 px-6">
                  {items.map((item) => (
                    <DropdownMenuItem
                      key={item.label}
                      className="flex items-center gap-3 text-[#6F6F6F] cursor-pointer focus:bg-transparent hover:opacity-70"
                    >
                      <Image src={item.icon} width={20} height={20} alt="" />
                      <span>{item.label}</span>
                    </DropdownMenuItem>
                  ))}
                </div>

                {/* Divider */}

                {/* Logout */}
                <DropdownMenuItem className="flex items-center gap-3 text-[#EB3A3A] px-8 pt-4 mt-1 cursor-pointer focus:bg-transparent hover:opacity-70">
                  <Image src={logout} width={20} height={20} alt="" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div
            className="flex flex-nowrap items-center gap-2 cursor-pointer"
            onClick={() => setOpenCart(true)}
          >
            <div className="relative w-6 h-6">
              {numberOfItemsInCart >= 1 && (
                <p className="absolute w-4 h-4 bg-[#27AE60] rounded-2xl text-center flex items-center justify-center text-[12px] leading-[18px] font-semibold text-[#FFFFFF] left-2.5 -top-1">
                  2
                </p>
              )}
              <Image src={cart} alt="cart" width={24} height={24} />
            </div>
            <p className="text-nowrap md:block hidden">My Cart</p>
          </div>

          <Image
            src={menu}
            alt={menu}
            className="w-6 h-6 md:w-5 md:h-5 block md:hidden"
            onClick={() => setOpenMenu(true)}
          />
        </div>
      </div>

      <RightDrawer
        isOpen={openCart}
        onClose={() => setOpenCart(false)}
        widthClass="w-full md:w-[600px]"
      >
        <MyCart onClose={() => setOpenCart(false)} />
      </RightDrawer>

      <RightDrawer
        isOpen={openMenu}
        onClose={() => setOpenMenu(false)}
        widthClass="max-w-[380px] w-full"
      >
        <MenuDrawer onClose={() => setOpenMenu(false)} />
      </RightDrawer>

      <RightDrawer
        isOpen={openProfile}
        onClose={() => setOpenProfile(false)}
        widthClass="max-w-[380px] w-full"
      >
        <MyAccountDrawer onClose={() => setOpenProfile(false)} />
      </RightDrawer>
    </section>
  );
}
