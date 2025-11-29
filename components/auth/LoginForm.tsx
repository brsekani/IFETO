import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff, MoveRight } from "lucide-react";
import { useState } from "react";
import emailIcon from "@/assets/icons/mail.svg";

const LoginForm = ({
  formik,
  isLogining,
}: {
  formik: any;
  isLogining: boolean;
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const emailHasError = formik.touched.email && formik.errors.email;
  const passwordHasError = formik.touched.password && formik.errors.password;

  const togglePassword = () => setShowPassword((prev: boolean) => !prev);

  const inputBaseClasses =
    "w-full outline-none border-none h-14 px-4 text-sm placeholder:text-light-aborder-light-active";

  return (
    <div className="lg:py-10 mt-7 lg:px-8 px-6 bg-white lg:shadow-custom rounded-2xl">
      <div className="text-center">
        <h2 className="font-bold font-inter text-2xl text-center">
          Login to Your Account
        </h2>
        <p className="text-light">
          Please provide your login details to proceed
        </p>
      </div>
      <div className="mt-8">
        <form onSubmit={formik.handleSubmit}>
          <div>
            <label className="block font-medium text-sm" htmlFor="email">
              Email
            </label>
            <div
              className={`w-full flex border rounded-md ${
                emailHasError ? "border-red-500" : "border-light-active"
              }`}
            >
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email address"
                className={inputBaseClasses}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              <Image src={emailIcon} alt="Email icon" className="pr-4 w-fit" />
            </div>
            {emailHasError && (
              <div className="text-red-600 text-xs mt-1">
                {formik.errors.email}
              </div>
            )}
          </div>

          <div className="mt-4">
            <label className="block font-medium text-sm" htmlFor="password">
              Password
            </label>
            <div
              className={`w-full border rounded-md flex items-center ${
                passwordHasError ? "border-red-500" : "border-light-active"
              }`}
            >
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Enter your password"
                className={inputBaseClasses}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              <button type="button" className="mr-4 " onClick={togglePassword}>
                {showPassword ? (
                  <Eye className="w-5 h-5" />
                ) : (
                  <EyeOff className="w-5 h-5" />
                )}
              </button>
            </div>
            {passwordHasError && (
              <div className="text-red-600 text-xs mt-1">
                {formik.errors.password}
              </div>
            )}
          </div>

          <div className="mt-4 flex justify-between gap-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                className="w-4 h-4 appearance-none border border-light-active rounded focus:ring-0 cursor-pointer checked:bg-primary checked:border-primary custom-checkbox"
              />
              <label
                htmlFor="rememberMe"
                className="ml-2 text-sm lg:text-base font-semibold"
              >
                Remember me
              </label>
            </div>
            <Link
              href="/auth/forgot-password"
              className="text-sm font-medium text-[#E53E3E] flex items-center gap-2"
            >
              Forgot Password? <MoveRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="mt-14 lg:mt-8">
            <button
              type="submit"
              disabled={!formik.isValid || !formik.dirty || isLogining}
              className={`w-full h-12 rounded-md text-center px-5 text-lg font-semibold cursor-pointer ${
                !formik.isValid || !formik.dirty
                  ? "bg-[#C7D3CC] text-white"
                  : "bg-primary text-white"
              }`}
            >
              {isLogining ? "Proceeding..." : "Proceed"}
            </button>
            <div className="flex items-center gap-2 w-full justify-center mt-2.5 text-base lg:text-lg font-semibold">
              <span className="">New on IFETO?</span>
              <Link href="/auth/signup" className="text-primary">
                Create an account
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
