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
import { useEffect, useMemo, useState } from "react";
import RightDrawer from "./RightDrawer";
import MyCart from "./MyCart";
import MenuDrawer from "./MenuDrawer";
import MyAccountDrawer from "./MyAccountDrawer";
import { UICartItem } from "@/types/cart";
import { logOut, selectIsAuthenticated } from "@/lib/authSlice";
import { useAppSelector } from "./auth/AuthGuard";
import { useGetCartQuery } from "@/lib/api/cart";
import { getLocalCart } from "@/lib/cart/localCart";
import { useGetLocalCartQuery } from "@/lib/api/localCartApi";
import Link from "next/link";
import { useGetProfileQuery } from "@/lib/api/profile";
import { useLogoutMutation } from "@/lib/api/auth";
import { showErrorToast, showSuccessToast } from "@/app/utils/toastHelpers";
import { useDispatch } from "react-redux";

const items = [
  { label: "My Order", icon: box },
  { label: "My Account", icon: user },
  { label: "Address", icon: location },
];

export default function Header() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const dispatch = useDispatch();
  const {
    data: profileData,
    isLoading: isLoadingProfileData,
    error,
  } = useGetProfileQuery(undefined, {
    skip: !isAuthenticated,
  });

  const { data, isLoading } = useGetCartQuery(undefined, {
    skip: !isAuthenticated,
  });

  const { data: localCart = [] } = useGetLocalCartQuery(undefined, {
    skip: isAuthenticated,
  });

  const [logoutUser, { isLoading: isLoggingOut }] = useLogoutMutation();

  const [openCart, setOpenCart] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [mounted, setMounted] = useState(false);

  const numberOfItemsInCart = useMemo(() => {
    if (isAuthenticated) {
      return (
        data?.data?.items?.reduce(
          (total: number, item: UICartItem) => total + item.quantity,
          0
        ) ?? 0
      );
    }

    return localCart.reduce((total, item) => total + item.quantity, 0);
  }, [isAuthenticated, data, localCart]);

  const handleLogout = async (): Promise<boolean> => {
    try {
      await logoutUser().unwrap();
      dispatch(logOut());

      showSuccessToast("Logged out successfully");
      setOpenProfile(false);
      setOpenMenu(false);
      return true;
    } catch (err) {
      showErrorToast("Logout failed");
      return false;
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

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

          {mounted && isAuthenticated ? (
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
                  <span className="hidden md:inline">
                    {isLoading ? (
                      <span className="inline-block h-5 mt-1 w-[120px] animate-pulse rounded bg-gray-200" />
                    ) : (
                      <span className="max-w-[140px] truncate text-[#2A2A2A]">
                        {`${profileData?.data.firstName} ${profileData?.data.lastName}`}
                      </span>
                    )}
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
                  <DropdownMenuItem
                    onSelect={(e) => {
                      e.preventDefault(); // ⛔ prevents dropdown from closing
                      handleLogout();
                    }}
                    disabled={isLoggingOut}
                    className="flex items-center gap-3 text-[#EB3A3A] px-8 pt-4 mt-1 cursor-pointer focus:bg-transparent hover:opacity-70"
                  >
                    <Image src={logout} width={20} height={20} alt="" />
                    <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <Link
              href={"/auth/login"}
              className="py-2.5 px-5 bg-[#27AE60] rounded-md text-[#FFFFFF] text-[18px] leading-7 font-semibold cursor-pointer md:block hidden"
            >
              Login / Signup
            </Link>
          )}

          <div
            className="flex flex-nowrap items-center gap-2 cursor-pointer"
            onClick={() => setOpenCart(true)}
          >
            <div className="relative w-6 h-6">
              {numberOfItemsInCart >= 1 && (
                <p className="absolute w-4 h-4 bg-[#27AE60] rounded-2xl text-center flex items-center justify-center text-[12px] leading-[18px] font-semibold text-[#FFFFFF] left-2.5 -top-1">
                  {numberOfItemsInCart}
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
        <MyAccountDrawer
          onClose={() => setOpenProfile(false)}
          onlogout={handleLogout}
          isLoggingOut={isLoggingOut}
        />
      </RightDrawer>
    </section>
  );
}
