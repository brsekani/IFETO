"use client";

import Image from "next/image";
import { useFormik } from "formik";
import * as Yup from "yup";
import back from "@/assets/icons/back.svg";
import emailIcon from "@/assets/icons/mail.svg";
import { useRouter } from "next/navigation";
import { ForgotPasswordSchema } from "@/lib/schema";
import useRedirectIfAuthenticated from "@/hooks/useRedirectIfAuthenticated";
import { showErrorToast, showSuccessToast } from "@/app/utils/toastHelpers";
import { useForgotPasswordMutation } from "@/lib/api/auth";
import Spinner from "@/components/loaders/Spinner";

export default function Page() {
  const { loading } = useRedirectIfAuthenticated();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: ForgotPasswordSchema,
    onSubmit: async (values) => {
      console.log("Submitted:", values);
      try {
        const result = await forgotPassword(values).unwrap();
        console.log(result);

        if (result.success) {
          showSuccessToast(result.message);

          router.push("/auth/reset-password-success");
        }
      } catch (err: any) {
        console.error("Signup Failed:", err);

        const errorMessage =
          err?.data?.message ||
          err?.error ||
          "An unexpected error occurred during forgot password.";
        showErrorToast(errorMessage);
      }
    },
  });

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
              <h6 className="text-[24px] leading-8 font-bold text-[#2A2A2A]">
                Forgot Your Password?
              </h6>
              <p className="text-[16px] leading-6 text-[#787878]">
                Enter your registered email address and we’ll send you a secure
                reset link.
              </p>
            </div>

            <form
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
            </form>
          </div>

          <button
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
          </button>
        </div>
      </div>
    </div>
  );
}
