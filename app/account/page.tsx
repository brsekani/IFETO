"use client";
import { Bell, ChevronRight, LockKeyhole, UserRound } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

const account = () => {
  const accountLinks = [
    { href: "/account/profile", label: "My Profile", Icon: UserRound },
    { href: "/account/security", label: "Security", Icon: LockKeyhole },
    // {
    //   href: "/account/notification",
    //   label: "Notification",
    //   Icon: Bell,
    // },
  ];
  useEffect(() => {
    if (window.innerWidth >= 768) {
      window.location.href = "/account/profile";
    }
  }, []);
  return (
    <div className="px-6 mt-4 md:hidden">
      <h2 className="text-lg font-semibold py-2">My Account</h2>

      <div className="">
        {accountLinks.map((val, i) => {
          const NavIcon = val.Icon;
          return (
            <Link
              key={i}
              href={val.href}
              className={`py-2 mt-4 font-medium flex items-center gap-2 justify-between transition-colors duration-300 text-light`}
            >
              <div className="flex items-center gap-2">
                <NavIcon className="w-5 h-5" /> {val.label}
              </div>
              <ChevronRight />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default account;
