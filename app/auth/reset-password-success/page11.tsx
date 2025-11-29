"use client";

import Image from "next/image";
import { useFormik } from "formik";
import * as Yup from "yup";
import back from "@/assets/icons/back.svg";
import emailIcon from "@/assets/icons/mail.svg";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { ResetPasswordSchema } from "@/lib/schema";
import { useRouter } from "next/navigation";
import useRedirectIfAuthenticated from "@/hooks/useRedirectIfAuthenticated";

export default function Page() {
  const { loading } = useRedirectIfAuthenticated();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: ResetPasswordSchema,
    onSubmit: (values) => {
      console.log("Submitted:", values);
      router.push("/auth/reset-password/success");
    },
  });

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div
      className="h-screen w-full bg-cover bg-no-repeat flex items-start justify-center relative"
      style={{
        backgroundImage: "url('/images/forgotPaswordBgImage.png')",
        backgroundPosition: "20% 75%",
      }}
    >
      <div className="absolute inset-0 bg-[#00000080]" />

      <div className="relative bg-white w-full md:max-w-[542px] h-full md:h-fit py-10 md:px-8 px-6 md:rounded-2xl md:mt-[120px] md:text-center text-start space-y-8 ">
        <Image src={back} alt="back" className="md:absolute hidden md:block" />
        <div className="flex w-full justify-between flex-col h-full">
          <div className="space-y-8">
            <div className="space-y-2 md:px-7">
              <Image
                src={back}
                alt="back"
                className="md:absolute block md:hidden mb-4"
              />
              <h6 className="text-[24px] leading-8 font-bold text-[#2A2A2A]">
                Reset Your Password
              </h6>
              <p className="text-[16px] leading-6 text-[#787878]">
                Create a strong new password to secure your account.
              </p>
            </div>

            <form
              className="w-full space-y-8"
              onSubmit={formik.handleSubmit}
              id="myForm"
            >
              <div className="space-y-4">
                <div className="flex items-start w-full flex-col gap-1">
                  <label className="text-[14px] leading-5 font-medium text-[#2A2A2A]">
                    New Password
                  </label>

                  <div className="relative w-full">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      className="h-14 w-full rounded-md outline-none border border-[#CFCFCF] pl-4 pr-10 text-[14px] leading-5 placeholder:text-[#CFCFCF] text-[#2A2A2A]"
                      placeholder="Enter new password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                    />

                    <button
                      type="button"
                      className="absolute top-4 right-4"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? (
                        <Eye className="w-5" />
                      ) : (
                        <EyeOff className="w-5" />
                      )}
                    </button>
                  </div>

                  {formik.touched.password && formik.errors.password && (
                    <p className="text-red-500 text-xs">
                      {formik.errors.password}
                    </p>
                  )}
                </div>

                <div className="flex items-start w-full flex-col gap-1">
                  <label className="text-[14px] leading-5 font-medium text-[#2A2A2A]">
                    Confirm New Password
                  </label>

                  <div className="relative w-full">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      id="confirmPassword"
                      className="h-14 w-full rounded-md outline-none border border-[#CFCFCF] pl-4 pr-10 text-[14px] leading-5 placeholder:text-[#CFCFCF] text-[#2A2A2A]"
                      placeholder="Reenter your new password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.confirmPassword}
                    />

                    <button
                      type="button"
                      className="absolute top-4 right-4"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                    >
                      {showConfirmPassword ? (
                        <Eye className="w-5" />
                      ) : (
                        <EyeOff className="w-5" />
                      )}
                    </button>
                  </div>

                  {formik.touched.confirmPassword &&
                    formik.errors.confirmPassword && (
                      <p className="text-red-500 text-xs">
                        {formik.errors.confirmPassword}
                      </p>
                    )}
                </div>
              </div>

              <button
                type="submit"
                disabled={!formik.dirty || !formik.isValid}
                className={`md:block hidden w-full h-12 rounded-md text-center text-[18px] leading-7 px-5 font-semibold  ${
                  !formik.isValid || !formik.dirty
                    ? "bg-[#C7D3CC] text-white"
                    : "bg-primary text-white cursor-pointer"
                }`}
              >
                Reset
              </button>
            </form>
          </div>

          <button
            type="submit"
            form="myForm"
            disabled={!formik.dirty || !formik.isValid}
            className={` md:hidden block w-full h-12 rounded-md text-center text-[18px] leading-7 px-5 font-semibold  ${
              !formik.isValid || !formik.dirty
                ? "bg-[#C7D3CC] text-white"
                : "bg-primary text-white cursor-pointer"
            }`}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
