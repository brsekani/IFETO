import useSignup from "@/hooks/form-hooks/useSignup";
import { useSignupMutation } from "@/lib/api/auth";
import { Check, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const CreatePasswordForm = ({ formik, isLoading }: any) => {
  const password = formik.values.password;
  const [showPassword, setshowPassword] = useState(false);

  const checks = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[@$!%*?&]/.test(password),
  };
  return (
    <div className="lg:py-10 mt-7 lg:px-8 px-6 bg-white lg:shadow-custom rounded-2xl">
      <div className="text-center">
        <h2 className="font-bold font-inter text-2xl text-center">
          Create Your Password
        </h2>
        <p className="text-light">
          Create a strong password to secure your account
        </p>
      </div>
      <div className="mt-8">
        <form className="" onSubmit={formik.handleSubmit}>
          <div className="">
            <label className="block font-medium text-sm" htmlFor="password">
              Password
            </label>
            <div className="w-full border border-light-active rounded-md flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Enter your first name"
                className="w-full outline-none border-none h-14 px-4 text-sm placeholder:text-light-aborder-light-active"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {showPassword ? (
                <button
                  className="mr-4"
                  onClick={() => setshowPassword((prev) => !prev)}
                >
                  <Eye className="w-5" />
                </button>
              ) : (
                <button
                  className="mr-4"
                  onClick={() => setshowPassword((prev) => !prev)}
                >
                  <EyeOff className="w-5" />
                </button>
              )}
            </div>
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-600 text-xs mt-1">
                {formik.errors.password}
              </div>
            )}
          </div>

          <div className="mt-4 flex flex-col gap-1">
            <div className="flex items-center gap-1">
              <div
                className={`rounded-full w-4 h-4 border text-white flex items-center justify-center ${
                  checks.length
                    ? "bg-green-500 border-green-500"
                    : "border-[#C7D3CC]"
                }`}
              >
                {checks.length && <Check className="w-2.5 stroke-3" />}
              </div>
              <p
                className={`text-xs ${
                  checks.length ? "text-green-600" : "text-[#606060]"
                }`}
              >
                At least 8 characters
              </p>
            </div>
            <div className="flex items-center gap-1">
              <div
                className={`rounded-full w-4 h-4 border text-white flex items-center justify-center ${
                  checks.upper
                    ? "bg-green-500 border-green-500"
                    : "border-[#C7D3CC]"
                }`}
              >
                {checks.upper && <Check className="w-2.5 stroke-3" />}
              </div>
              <p
                className={`text-xs ${
                  checks.upper ? "text-green-600" : "text-[#606060]"
                }`}
              >
                At least 1 upper case letter
              </p>
            </div>
            <div className="flex items-center gap-1">
              <div
                className={`rounded-full w-4 h-4 border text-white flex items-center justify-center ${
                  checks.lower
                    ? "bg-green-500 border-green-500"
                    : "border-[#C7D3CC]"
                }`}
              >
                {checks.lower && <Check className="w-2.5 stroke-3" />}
              </div>
              <p
                className={`text-xs ${
                  checks.lower ? "text-green-600" : "text-[#606060]"
                }`}
              >
                At least 1 lower case letter
              </p>
            </div>
            <div className="flex items-center gap-1">
              <div
                className={`rounded-full w-4 h-4 border text-white flex items-center justify-center ${
                  checks.number
                    ? "bg-green-500 border-green-500"
                    : "border-[#C7D3CC]"
                }`}
              >
                {checks.number && <Check className="w-2.5 stroke-3" />}
              </div>
              <p
                className={`text-xs ${
                  checks.number ? "text-green-600" : "text-[#606060]"
                }`}
              >
                At least 1 number
              </p>
            </div>
            <div className="flex items-center gap-1">
              <div
                className={`rounded-full w-4 h-4 border text-white flex items-center justify-center ${
                  checks.special
                    ? "bg-green-500 border-green-500"
                    : "border-[#C7D3CC]"
                }`}
              >
                {checks.special && <Check className="w-2.5 stroke-3" />}
              </div>
              <p
                className={`text-xs ${
                  checks.special ? "text-green-600" : "text-[#606060]"
                }`}
              >
                At least 1 special character (e.g @ * # $ %)
              </p>
            </div>
          </div>
          <div className="mt-8">
            <div className="">
              <button
                type="submit"
                disabled={isLoading}
                className={` w-full h-12 rounded-md text-center px-5 text-lg  font-semibold cursor-pointer ${
                  !formik.isValid || !formik.dirty
                    ? "bg-[#C7D3CC] text-white"
                    : "bg-primary text-white"
                }`}
              >
                {isLoading ? "Proceeding..." : "Proceed"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePasswordForm;
