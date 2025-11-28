"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Logo from "@/assets/images/IFETO-Logo-1.png";
import authImage from "@/assets/images/loginBG.png";
import authImage2 from "@/assets/images/authImg2.png";
import AuthSliderMobile from "@/components/auth/AuthSliderMobile";
import AuthSliderDesktop from "@/components/auth/AuthSliderDesktop";
import LoginForm from "@/components/auth/LoginForm";
import useLogin from "@/hooks/form-hooks/useLogin";

const page = () => {
  const { formik } = useLogin();
  const [backgroundIndex, setBackgroundIndex] = useState(0);

  const backgroundImages = [authImage, authImage2];

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
        <LoginForm formik={formik} />
      </div>

      {/* right side desktop*/}
      <div className="relative hidden lg:block w-full lg:w-1/2 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={backgroundIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${backgroundImages[backgroundIndex].src})`,
            }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-[#00000033]"></div>
        <div className="absolute bottom-14 left-10 right-10 z-10">
          <AuthSliderDesktop onIndexChange={setBackgroundIndex} />
        </div>
      </div>
    </section>
  );
};
export default page;
