"use client";

import Image from "next/image";
import Link from "next/link";
import arrowRight from "@/assets/icons/arrow-right1.svg";
import rightIconPrimary from "@/assets/icons/right-icon-primary.svg";
import garri from "@/assets/images/Garri.png";
import info from "@/assets/icons/info-circle-primary.svg";
import { useState } from "react";
import RightDrawer from "@/components/RightDrawer";
import AddAddress from "@/components/AddAddress";

export default function page() {
  const [openAddress, setOpenAddress] = useState(false);
  const address = [
    {
      name: "Halimah Balogun",
      address:
        "742 Meadowbrook Lane Suite, 204 Fairfield, Ohio 45014, United States",
      email: "Halimah.balogun@gmail.com ",
      phoneNumber: "+1 (458) 742-1930  ",
    },
  ];

  return (
    <div className="bg-[#FAFAFA]">
      <div className="max-w-[1440px] w-full mx-auto px-6 md:px-20 pt-6 pb-20">
        <div className="flex">
          <Link
            href={"/"}
            className="py-2 px-4 text-[16px] leading-6 font-semibold text-[#5A5A5A]"
          >
            Home
          </Link>
          <Image src={arrowRight} alt="arrowRight" />
          <Link
            href={``}
            className="py-2 px-4 text-[16px] leading-6 font-semibold text-[#5A5A5A] text-nowrap truncate"
          >
            My Cart
          </Link>

          <Image src={arrowRight} alt="arrowRight" />
          <div className="py-2 px-4 text-[16px] leading-6 font-semibold text-[#27AE60] text-nowrap truncate">
            Checkout
          </div>
        </div>

        <div className="flex flex-col md:flex-row w-full md:gap-10 gap-6 md:mt-[50px] mt-6">
          <div className="w-full md:space-y-8 space-y-6 ">
            <div className="md:p-6 p-4 bg-[#E3FFEF4D] shadow-custom2 md:space-y-4 space-y-2.5 w-full">
              <h5 className="md:text-[24px] text-[16px] md:leading-8 leading-6 font-semibold text-[#2A2A2A]">
                Contact
              </h5>
              <div className="md:space-y-2 space-y-[5px]">
                <h6 className="md:text-[20px] text-[14px] leading-[30px] font-medium text-[#2A2A2A]">
                  Halimah Balogun
                </h6>
                <p className="md:text-[18px] text-[12px] md:leading-7 leading-[18px] text-[#787878]">
                  Halimah.balogun@gmail.com
                </p>
                <p className="md:text-[18px] text-[12px] md:leading-7 leading-[18px] text-[#787878]">
                  +234 705 113 9856
                </p>
              </div>
            </div>

            {address.length >= 1 ? (
              <div className="bg-[#FFFFFF] md:p-6 p-4 shadow-custom2 rounded-2xl md:space-y-4 space-y-2.5">
                <div className="flex items-center justify-between">
                  <h6 className="md:text-[24px] text-[16px] leading-6 font-semibold text-[#2A2A2A] truncate">
                    Delivery Details
                  </h6>

                  <div className="flex md:space-x-2.5 space-x-1.5 max-w-full">
                    <button
                      className="md:px-4 px-2 md:py-2 py-[3px]
      rounded-md bg-primary md:text-[16px] text-[12px]
      md:leading-6 leading-[18px] text-white font-semibold
      cursor-pointer
      max-w-[140px] md:max-w-none
      truncate overflow-hidden whitespace-nowrap"
                    >
                      Select Address
                    </button>

                    <button
                      className="md:px-4 px-2 md:py-2 py-[3px]
      rounded-md text-primary md:text-[16px] text-[12px]
      md:leading-6 leading-[18px] font-semibold
      border-[0.6px] border-primary cursor-pointer
      max-w-[140px] md:max-w-none
      truncate overflow-hidden whitespace-nowrap"
                      onClick={() => setOpenAddress(true)}
                    >
                      Add New Address
                    </button>
                  </div>
                </div>

                <div className="md:space-y-2 space-y-[5px] md:text-[18px] text-[12px] md:leading-7 leading-[18px] text-[#787878]">
                  <h5 className="text-[#2A2A2A] md:text-[20px] text-[14px] md:leading-[30px] leading-5 font-medium">
                    Halimah Balogun
                  </h5>
                  <p>
                    742 Meadowbrook Lane Suite, 204 Fairfield, Ohio 45014,
                    United States
                  </p>
                  <p>Halimah.balogun@gmail.com </p>
                  <p>+1 (458) 742-1930</p>
                </div>
              </div>
            ) : (
              <div className="p-6 bg-[#FFFFFF] shadow-custom2 space-y-4 w-full">
                <h5 className="text-[24px] leading-8 font-semibold text-[#2A2A2A]">
                  Delivery Details
                </h5>
                <div
                  onClick={() => setOpenAddress(true)}
                  className="flex items-center justify-between py-2.5 px-4 border-[0.6px] border-primary rounded-md text-primary font-semibold leading-7 cursor-pointer"
                >
                  <p>Add Address</p>
                  <Image src={rightIconPrimary} alt="rightIconPrimary" />
                </div>
              </div>
            )}
          </div>

          <div className="w-full">
            <div className="p-4 md:p-6 bg-[#FAFAFA] rounded-2xl shadow-custom2 md:space-y-4 space-y-2.5 w-full">
              <div className="md:text-[24px] text-[16px] md:leading-8 leading-6 font-semibold text-[#2A2A2A]">
                Product Summary
              </div>

              <div className="flex md:gap-5 gap-3 border-t-[0.6px] border-[#CFCFCF] md:p-4 p-2.5">
                <div className="bg-[#EFEEEE] w-fit md:px-[18px] px-[11px] md:py-6 py-3.5 relative rounded-[6px]">
                  <Image
                    src={garri}
                    alt=""
                    className="md:w-[84px] w-[49px] md:h-[57px] h-[38px]"
                  />
                  <div className="absolute top-3 right-2 w-4 h-4 bg-[#27AE60] rounded-full flex items-center justify-center text-[12px] leading-[18px] font-semibold text-[#FFFFFF]">
                    2
                  </div>
                </div>

                <div className="md:space-y-1.5 space-y-1">
                  <p className="md:text-[20px] text-[14px] md:leading-[30px] leading-5 text-[#2A2A2A] font-semibold">
                    Yellow Garri
                  </p>
                  <p className="md:text-[18px] text-[12px] md:leading-7 leading-[18px] text-[#6C6C6C]">
                    Qty: 2 Half Paint Bucket (1kg Bucket )
                  </p>
                  <p className="md:text-[20px] text-[14px] md:leading-[30px] leading-5 text-[#2A2A2A] font-semibold">
                    $49.98
                  </p>
                </div>
              </div>

              <div className="bg-[#E3FFEF4D] p-4 md:space-y-4 space-y-2.5 md:text-[20px] text-[14px] md:leading-[30px] leading-5 text-[#484848] font-medium">
                <div className="flex justify-between">
                  <p>Sub Total:</p>
                  <p>$74.97</p>
                </div>

                <div className="flex justify-between">
                  <p>Weight:</p>
                  <p>4.8 kg</p>
                </div>

                <div className="flex justify-between">
                  <div className="flex items-center gap-2.5">
                    <p>Weight Fee:</p>
                    <Image src={info} alt="info" />
                  </div>

                  <p>$43.2</p>
                </div>

                <div className="flex justify-between md:text-[24px] text-[16px] md:leading-8 leading-6 text-[#484848] font-bold">
                  <p>Total:</p>
                  <p>$118.17</p>
                </div>
              </div>

              <button className="h-12 bg-[#C7D3CC] w-full text-[#FFFFFF] text-[18px] leading-7 font-semibold border border-[#D0D5DD] rounded-md cursor-pointer">
                Pay $118.17
              </button>
            </div>
          </div>
        </div>
      </div>

      <RightDrawer
        isOpen={openAddress}
        onClose={() => setOpenAddress(false)}
        widthClass="w-full md:w-[600px]"
      >
        <AddAddress onClose={() => setOpenAddress(false)} />
      </RightDrawer>
    </div>
  );
}
