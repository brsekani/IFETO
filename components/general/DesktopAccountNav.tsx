"use client";
import Link from "next/link";
import { UserRound, LockKeyhole, Bell } from "lucide-react";
import { usePathname } from "next/navigation";

const DesktopAccountNav = () => {
  const pathname = usePathname();
  const accountLinks = [
    { href: "/account/profile", label: "My Profile", Icon: UserRound },
    { href: "/account/security", label: "Security", Icon: LockKeyhole },
    // {
    //   href: "/account/notification",
    //   label: "Notification",
    //   Icon: Bell,
    // },
  ];
  return (
    <div className="w-[305px] shadow-custom2 bg-white p-4 rounded-2xl">
      <h2 className="p-4 font-medium text-[#787878] border-b-[0.6px] border-[#EFEEEE]">
        My Account
      </h2>
      <div className="mt-4">
        {accountLinks.map((val, i) => {
          const NavIcon = val.Icon;
          return (
            <Link
              key={i}
              href={val.href}
              className={`p-4 font-medium flex items-center gap-2 transition-colors duration-300 ${
                pathname.startsWith(val.href)
                  ? "bg-[#E3FFEF] text-primary rounded-lg"
                  : " text-[#787878]"
              } `}
            >
              <NavIcon className="w-5 h-5" /> {val.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default DesktopAccountNav;
