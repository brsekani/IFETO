"use client";
import Image from "next/image";
import Logo from "@/assets/images/IFETO-Logo-1.png";
import authImage from "@/assets/images/authImg.png";
import AuthSliderMobile from "@/components/auth/AuthSliderMobile";
import AuthSliderDesktop from "@/components/auth/AuthSliderDesktop";
import VerifyCodeForm from "@/components/auth/VerifyCodeForm";
import useVerify from "@/hooks/form-hooks/useVerify";

const Verify = () => {
  const { formik, resendTimer, handleResendCode, isResendDisabled } =
    useVerify();

  return (
    <section className="w-full min-h-screen flex flex-col lg:flex-row overflow-hidden lg:bg-[#F9F9F9] bg-white">
      {/* left side */}
      <div className="w-full lg:w-1/2 lg:px-[45px] lg:py-20 mt-3 mb-10">
        {/* logo */}
        <div className="flex justify-center items-center">
          <Image src={Logo} alt="logo" className="lg:w-[266px] w-[152px]" />
        </div>

        {/* mobile slider */}
        <AuthSliderMobile />

        {/* forms */}
        <VerifyCodeForm
          formik={formik}
          resendTimer={resendTimer}
          onResendCode={handleResendCode}
          isResendDisabled={isResendDisabled}
        />
      </div>

      {/* right side desktop*/}
      <div
        className="relative hidden lg:block w-full lg:w-1/2 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${authImage.src})`,
        }}
      >
        <div className="absolute inset-0 bg-[#00000033]"></div>
        <div className="absolute bottom-14 left-10 right-10 z-10">
          <AuthSliderDesktop />
        </div>
      </div>
    </section>
  );
};

export default Verify;
