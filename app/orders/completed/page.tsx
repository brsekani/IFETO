import { CircleCheck, ChevronRight, Box } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import garriImg from "@/assets/images/Garri.png";

const OrderCompleted = () => {
  return (
    <div className="w-full lg:py-7 lg:px-20 md:px-14 px-6 bg-[#FAFAFA] max-w-[1440px] mx-auto min-h-[calc(100vh-8rem)] overflow-hidden">
      <div className="w-full flex gap-4 items-center text-[#5A5A5A] font-semibold">
        <Link
          href="/"
          className="hover:text-primary hover:underline duration-300"
        >
          Home
        </Link>
        <ChevronRight className="w-4 h-4 text-light" />
        <Link
          href="/cart"
          className="hover:text-primary hover:underline duration-300"
        >
          My Cart
        </Link>
        <ChevronRight className="w-4 h-4 text-light" />
        <span className="text-primary ">Checkout</span>
      </div>

      <div className="mt-8 lg:mt-14 mb-6 lg:mb-10">
        <div className="flex gap-2 items-center">
          <CircleCheck className="text-primary lg:w-10 w-[25px] lg:h-10 h-[25px] " />
          <span className="font-semibold lg:text-3xl text-xl text-[#363636]">
            Order Completed!
          </span>
        </div>
        <p className="text-[#606060] lg:text-2xl mt-2.5 lg:mt-6">
          Thank you for your. Your order has been confirmed and will soon be
          shipped.
        </p>
        <div className="lg:mt-16 mt-6 shadow-custom2 p-4 lg:p-6 rounded-2xl bg-white">
          <h2 className="lg:text-2xl font-semibold">Order Receipt</h2>
          <div className="lg:mt-4 mt-2.5">
            <div className="flex gap-3 items-center">
              <span className="text-light text-xs lg:text-lg">Order ID:</span>
              <span className="text-[#363636] text-xs lg:text-lg font-medium">
                #123456789
              </span>
            </div>
            <div className="flex gap-3 items-center mt-2">
              <span className="text-light text-xs lg:text-lg">Date:</span>
              <span className="text-[#363636] text-xs lg:text-lg font-medium">
                December 14, 2025
              </span>
            </div>
            <div className="flex gap-3 items-center mt-2">
              <span className="text-light text-xs lg:text-lg">Email:</span>
              <span className="text-[#363636] text-xs lg:text-lg font-medium">
                Halimah.balogun@gmail.com
              </span>
            </div>
            <div className="flex gap-3 items-center mt-2">
              <span className="text-light text-xs lg:text-lg">
                Payment Status:
              </span>
              <span className="text-[#363636] text-xs lg:text-lg font-medium">
                Successful
              </span>
            </div>
            <div className="flex gap-3 items-center mt-2">
              <span className="text-light text-xs lg:text-lg">Currency:</span>
              <span className="text-[#363636] text-xs lg:text-lg font-medium">
                USD ($)
              </span>
            </div>
            <div className="flex gap-3 items-center mt-2">
              <span className="text-light text-xs lg:text-lg">
                Total Amount:
              </span>
              <span className="text-[#363636] text-xs lg:text-lg font-medium">
                $118.7
              </span>
            </div>
            <div className="flex gap-3 items-center mt-2">
              <span className="text-light text-xs lg:text-lg">
                Payment Method:
              </span>
              <span className="text-[#363636] text-xs lg:text-lg font-medium">
                Stripe
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:my-10 my-6">
        <div className="bg-[#E3FFEF] lg:p-6 py-4 flex flex-col lg:flex-row lg:gap-6 gap-3">
          <div className="bg-primary rounded-2xl p-3 h-fit w-fit mx-4  lg:m-0">
            <Box className="w-8 h-8 text-white" />
          </div>
          <div className="w-full">
            <div className="px-4 lg:px-0">
              <h2 className="lg:text-2xl text-lg font-semibold">
                Never run out of this product
              </h2>
              <p className="lg:text-lg text-sm text-light mt-2">
                Set this item(s) to reorder automatically on a schedule that
                works for you.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-custom2 py-6 px-4 mt-6">
              <div className="flex justify-between py-5 px-6 border-b border-[#EFEEEE]">
                <div className="flex gap-6">
                  <div className="relative lg:w-full lg:h-[112px] h-full w-[71px] bg-[#EFEEEE] rounded-md overflow-hidden border border-gray-100">
                    <Image
                      src={garriImg}
                      alt={"Item image"}
                      fill
                      className="object-contain lg:p-2"
                    />
                  </div>
                  <div className="">
                    <h2 className="text-sm lg:text-lg font-semibold">
                      Yellow Garri
                    </h2>
                    <p className="text-light lg:mt-3.5 mt-1 lg:text-base text-xs">
                      Qty: 2 Half Paint Bucket (1kg Bucket)
                    </p>
                    <p className="lg:hidden text-sm text-[#5A5A5A] mt-1 font-bold">
                      $49.98
                    </p>
                  </div>
                </div>
                <div className="lg:flex justify-between flex-col hidden">
                  <h2 className="text-lg text-[#5A5A5A] font-medium">$24.99</h2>
                  <p className="text-lg text-[#5A5A5A] mt-2 font-bold">
                    $49.98
                  </p>
                </div>
              </div>
              <div className="flex justify-between py-5 px-6 mt-4 border-b border-[#EFEEEE]">
                <div className="flex gap-6">
                  <div className="relative lg:w-full lg:h-[112px] h-full w-[71px] bg-[#EFEEEE] rounded-md overflow-hidden border border-gray-100">
                    <Image
                      src={garriImg}
                      alt={"Item image"}
                      fill
                      className="object-contain lg:p-2"
                    />
                  </div>
                  <div className="">
                    <h2 className="text-sm lg:text-lg font-semibold">
                      Yellow Garri
                    </h2>
                    <p className="text-light lg:mt-3.5 mt-1 lg:text-base text-xs">
                      Qty: 2 Half Paint Bucket (1kg Bucket)
                    </p>
                    <p className="lg:hidden text-sm text-[#5A5A5A] mt-1 font-bold">
                      $49.98
                    </p>
                  </div>
                </div>
                <div className="lg:flex justify-between flex-col hidden">
                  <h2 className="text-lg text-[#5A5A5A] font-medium">$24.99</h2>
                  <p className="text-lg text-[#5A5A5A] mt-2 font-bold">
                    $49.98
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center">
              <Link href="/orders/create-routine" className="bg-primary rounded-[6px] flex justify-center items-center w-full px-5 h-12 text-center text-white font-semibold lg:text-lg">
                Set up routine order
              </Link>
              <Link href="/" className="bg-transparent w-full px-5 h-12 text-center text-primary font-semibold lg:text-lg">
                Maybe later
              </Link>
            </div>
          </div>
        </div>

        <button className="lg:mt-12 mt-6 border border-primary w-full h-12 rounded-[6px] text-primary lg:text-lg font-semibold ">
          Continue
        </button>
      </div>
    </div>
  );
};

export default OrderCompleted;
