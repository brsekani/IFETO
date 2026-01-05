import Image from "next/image";
import { useRouter } from "next/navigation";

import logo from "@/assets/icons/Logo.svg";
import close from "@/assets/icons/Close.svg";
import MobilePlayStorebadge from "@/assets/icons/MobilePlayStorebadge.svg";
import MobileAppStorebadge from "@/assets/icons/MobileAppStorebadge.svg";
import rightWard from "@/assets/icons/rightWard.svg";
import box from "@/assets/icons/box.svg";
import user from "@/assets/icons/user.svg";
import location from "@/assets/icons/location.svg";
import logout from "@/assets/icons/logout.svg";

export default function MyAccountDrawer({
  onClose,
  onlogout,
  isLoggingOut,
}: {
  onClose: () => void;
  onlogout: () => Promise<boolean>;
  isLoggingOut: boolean;
}) {
  const router = useRouter();
  console.log(isLoggingOut);

  const links = [
    {
      name: "My Order",
      to: "/orders",
      icon: box,
      textColor: "#787878",
    },
    {
      name: "My Account",
      to: "/account",
      icon: user,
      textColor: "#787878",
    },
    {
      name: "Address Management",
      to: "/",
      icon: location,
      textColor: "#787878",
    },
    {
      name: "Logout",
      to: "/",
      icon: logout,
      textColor: "#E53E3E",
    },
  ];

  const CategoryLinks = [
    {
      name: "Grains & Tubers",
      to: "/",
    },
    {
      name: "Proteins",
      to: "/",
    },
    {
      name: "Fruits & Vegetables",
      to: "/",
    },
    {
      name: "Attires",
      to: "/",
    },
    {
      name: "Tubers & Nuts",
      to: "/",
    },
    {
      name: "Oil & Butter",
      to: "/",
    },
    {
      name: "Herbs & Spices",
      to: "/",
    },
    {
      name: "Seafood",
      to: "/",
    },
  ];

  return (
    <div className="flex flex-col h-screen gap-6 p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between py-4">
          <Image src={logo} alt="logo" className="w-12 h-8" />
          <Image src={close} alt="close" onClick={onClose} />
        </div>

        <div className="space-y-4 pb-4 border-[#EFEEEE] border-b-[0.6px]">
          {links.map((l, i) => (
            <div
              key={i}
              className={`py-2.5 text-[${l.textColor}] text-[14px] leading-5 flex items-center justify-between`}
              onClick={async () => {
                if (l.name === "Logout") {
                  if (isLoggingOut) return;

                  const success = await onlogout();

                  if (success) {
                    onClose();
                  }

                  return;
                }

                onClose();
                router.replace(l.to);
              }}
            >
              <div className="flex items-center gap-2">
                <Image src={l.icon} alt="" />
                {l.name === "Logout" && isLoggingOut
                  ? "Logging out..."
                  : l.name}
              </div>

              <Image src={rightWard} alt="rightWard" />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-start gap-4 flex-col h-full overflow-y-auto">
        <div className="py-2 text-[18px] leading-7 text-[#2A2A2A] font-semibold">
          Category
        </div>

        <div className="space-y-4 ">
          {CategoryLinks.map((l, i) => (
            <div
              key={i}
              className="py-2 text-[16px] leading-6 text-[#5A5A5A]"
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
    </div>
  );
}
