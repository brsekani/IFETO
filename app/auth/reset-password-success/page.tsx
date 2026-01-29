"use client";

import back from "@/assets/icons/back.svg";
import emailIcon from "@/assets/icons/mail.svg";
import verifyImg from "@/assets/images/verify.png";
import Spinner from "@/components/loaders/Spinner";
import useRedirectIfAuthenticated from "@/hooks/useRedirectIfAuthenticated";
import { Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Page() {
  const { loading } = useRedirectIfAuthenticated();
  const router = useRouter();

  if (loading) {
    return <Spinner />;
  }

  return (
    <div
      className="min-h-screen w-full bg-cover bg-no-repeat flex items-start justify-center relative"
      style={{
        backgroundImage: "url('/images/forgotPaswordBgImage.png')",
      }}
    >
      <div className="absolute inset-0 bg-[#00000080]" />

      <div className="relative bg-white w-full md:max-w-[542px] min-h-screen md:min-h-fit py-10 md:px-8 px-6 md:rounded-2xl md:mt-[120px] md:text-center text-start space-y-8 ">
        <Image
          src={back}
          alt="back"
          className="md:absolute hidden md:block cursor-pointer"
          onClick={() => router.back()}
        />
        <div className="flex w-full justify-between flex-col h-full">
          <div className="space-y-8">
            <div className="space-y-2 md:pb-[29px] md:px-7">
              <Image
                src={back}
                alt="back"
                className="md:absolute block md:hidden mb-4 cursor-pointer"
                onClick={() => router.back()}
              />
              <div className="bg-[#E3FFEF] w-12 h-12 rounded-full md:mx-auto mt-6 md:mt-0 flex items-center justify-center">
                <Mail className="text-primary" />
              </div>
              <h6 className="text-2xl leading-8 font-bold text-[#2A2A2A]">
                Check Your Email
              </h6>
              <p className="text-[16px] leading-6 text-[#787878]">
                We've sent a password reset link to your email
              </p>
            </div>

            <div className="mt-8 rounded-sm w-full p-4 border-[0.2px] border-primary bg-[#E3FFEF] text-[#5A5A5A] text-center">
              Click the link in the email to reset your password. The link will
              expire in 1 hour.
            </div>

            <Link
              href="/auth/forgot-password"
              className="text-primary font-semibold text-lg text-center"
            >
              Didn't receive the email? Try again
            </Link>
            {/* <form
              className="w-full space-y-8"
              onSubmit={formik.handleSubmit}
              id="myForm"
            >
              <div className="flex items-start w-full flex-col gap-1">
                <label className="text-[14px] leading-5 font-medium text-[#2A2A2A]">
                  Email
                </label>

                <div className="relative w-full">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="h-14 w-full rounded-md outline-none border border-[#CFCFCF] pl-4 pr-10 text-[14px] leading-5 placeholder:text-[#CFCFCF] text-[#2A2A2A]"
                    placeholder="Enter your email address"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    disabled={isLoading}
                  />

                  <Image
                    src={emailIcon}
                    alt="Email icon"
                    className="absolute top-4.5 right-4"
                  />
                </div>
                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-500 text-xs">{formik.errors.email}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={!formik.dirty || !formik.isValid || isLoading}
                className={`md:block hidden w-full h-12 rounded-md text-center text-[18px] leading-7 px-5 font-semibold  ${
                  !formik.isValid || !formik.dirty
                    ? "bg-[#C7D3CC] text-white"
                    : "bg-primary text-white cursor-pointer"
                }`}
              >
                {isLoading ? "Sending..." : "Send"}
              </button>
            </form> */}
          </div>

          {/* <button
            type="submit"
            form="myForm"
            disabled={!formik.dirty || !formik.isValid || isLoading}
            className={` md:hidden block w-full h-12 rounded-md text-center text-[18px] leading-7 px-5 font-semibold  ${
              !formik.isValid || !formik.dirty
                ? "bg-[#C7D3CC] text-white"
                : "bg-primary text-white cursor-pointer"
            }`}
          >
            {isLoading ? "Sending..." : "Send"}
          </button> */}
        </div>
      </div>
    </div>
  );
}
