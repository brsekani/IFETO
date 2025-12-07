import Image from "next/image";
import phoneMockUpDeskop from "@/assets/images/phoneMockUpDeskop.png";
import phoneMockUpMobile from "@/assets/images/phoneMockUpMobile.png";
import MobilePlayStorebadge from "@/assets/icons/MobilePlayStorebadge.svg";
import MobileAppStorebadge from "@/assets/icons/MobileAppStorebadge.svg";

export default function AppDownload() {
  return (
    <div className="bg-[#27AE60] md:max-h-[644px] max-h-full h-full py-6 xl:py-0">
      <div className="max-w-[1440px] mx-auto w-full px-6 md:px-20 flex items-center flex-col md:flex-row justify-between gap-6">
        <div className="max-w-[570px] w-full space-y-6 text-center md:text-start px-[14.5px] md:px-0">
          <h1 className="md:text-[36px] text-[20px] md:leading-11 leading-[30px] tracking-[-2%] text-[#FFFFFF] font-semibold ">
            Shop Faster. Track Easier. Experience More on the App.
          </h1>
          <p className="md:text-[20px] text-[16px] md:leading-[30px] leading-6 text-[#FFFFFF]">
            Unlock faster browsing, real-time order tracking, secure payments,
            and app-only offers. Our mobile app gives you the complete
            experience, wherever you are.
          </p>
          <div className="flex items-center justify-center md:justify-start gap-3">
            <Image src={MobilePlayStorebadge} alt="" />
            <Image src={MobileAppStorebadge} alt="" />
          </div>
        </div>

        <Image src={phoneMockUpDeskop} alt="" className="md:block hidden" />
        <Image src={phoneMockUpMobile} alt="" className="block md:hidden" />
      </div>
    </div>
  );
}
