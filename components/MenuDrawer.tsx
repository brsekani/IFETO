import Image from "next/image";
import { useRouter } from "next/navigation";

import logo from "@/assets/icons/Logo.svg";
import close from "@/assets/icons/Close.svg";
import MobilePlayStorebadge from "@/assets/icons/MobilePlayStorebadge.svg";
import MobileAppStorebadge from "@/assets/icons/MobileAppStorebadge.svg";

export default function MenuDrawer({ onClose }) {
  const router = useRouter();

  const links = [
    {
      name: "Home",
      to: "/",
    },
    {
      name: "Shop",
      to: "/shop",
    },
    {
      name: "About Us",
      to: "/about",
    },
    {
      name: "Contact Us",
      to: "/contact",
    },
  ];

  return (
    <div className="flex flex-col h-screen justify-between p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between py-4">
          <Image src={logo} alt="logo" className="w-12 h-8" />
          <Image src={close} alt="close" onClick={onClose} />
        </div>

        <div className="space-y-4">
          {links.map((l, i) => (
            <div
              key={i}
              className="py-4 text-[#5A5A5A] text-[16px] leading-6"
              onClick={() => {
                onClose();
                router.replace(l.to);
              }}
            >
              {l.name}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center md:justify-start gap-3">
        <Image
          src={MobilePlayStorebadge}
          alt=""
          className="w-[170px] h-[50px]"
        />
        <Image
          src={MobileAppStorebadge}
          alt=""
          className="w-[150px] h-[50px]"
        />
      </div>
    </div>
  );
}
