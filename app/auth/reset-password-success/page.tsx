"use client";

import verifyImg from "@/assets/images/verify.png";
import useRedirectIfAuthenticated from "@/hooks/useRedirectIfAuthenticated";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Page() {
  const { loading } = useRedirectIfAuthenticated();
  const router = useRouter();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#FAFAFA] h-screen flex items-center justify-center px-4">
      <div
        className="
          w-full md:max-w-[396px] mx-auto rounded-2xl 
          md:p-12 px-6 py-12 md:bg-white lg:shadow-custom 
          flex flex-col md:justify-center justify-between h-full md:h-fit
        "
      >
        <div className="flex flex-col items-center mt-[120px] md:mt-0">
          <Image
            src={verifyImg}
            alt="success image"
            className="w-[300px] animate-pulse"
          />

          <p className="mt-8 md:text-[24px] text-[18px] leading-8 text-[#5A5A5A] font-medium text-center">
            Password reset code has been sent to your email. Please check your
            inbox.
          </p>
        </div>

        {/* BUTTON ALWAYS STAYS AT THE BOTTOM ON MOBILE */}
        <button
          onClick={() => router.push("/auth/login")}
          className="bg-primary h-12 w-full rounded-md text-white font-semibold text-[18px] leading-7 cursor-pointer mt-10 md:mt-[120px]"
        >
          Continue to Login
        </button>
      </div>
    </div>
  );
}
