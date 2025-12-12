"use client";
import { useRouter } from "next/navigation";
import { ChevronLeft, Eye, EyeOff, LockKeyhole, Trash2 } from "lucide-react";

import useSecurityForm from "@/hooks/form-hooks/useSecurityForm";
const security = () => {
  const router = useRouter();
  const {
    formik,
    setShowConfirmPassword,
    setShowCurrentPassword,
    setShowNewPassword,
    showConfirmPassword,
    showCurrentPassword,
    showNewPassword,
  } = useSecurityForm();
  return (
    <div className="w-full h-full lg:shadow-custom2 bg-white lg:rounded-2xl p-6">
      <div className="lg:block flex items-center gap-2 w-full justify-between">
        <button
          className="lg:hidden flex items-center gap-2 outline-none text-light cursor-pointer"
          onClick={() => router.back()}
        >
          <ChevronLeft className="w-4" />
          <span className="font-medium">back</span>
        </button>

        <div className="flex items-center gap-2 lg:mt-6">
          <LockKeyhole className="w-6 text-light hidden lg:block" />
          <span className="lg:text-2xl text-xl font-semibold ">Security</span>
        </div>
        <div className="lg:hidden"></div>
      </div>

      <form className="mt-4 lg:mt-6" onSubmit={formik.handleSubmit}>
        <div className="">
          <label
            className="block font-medium text-sm"
            htmlFor="currentPassword"
          >
            Current Password
          </label>
          <div className="w-full border border-light-active rounded-md flex items-center">
            <input
              type={showCurrentPassword ? "text" : "password"}
              name="currentPassword"
              id="currentPassword"
              placeholder="Enter your current password"
              className="w-full outline-none border-none h-14 px-4 text-sm placeholder:text-light-aborder-light-active"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.currentPassword}
            />
            {showCurrentPassword ? (
              <button
                type="button"
                className="mr-4 cursor-pointer"
                onClick={() => setShowCurrentPassword((prev) => !prev)}
              >
                <Eye className="w-5" />
              </button>
            ) : (
              <button
                type="button"
                className="mr-4 cursor-pointer"
                onClick={() => setShowCurrentPassword((prev) => !prev)}
              >
                <EyeOff className="w-5" />
              </button>
            )}
          </div>
          {formik.touched.currentPassword && formik.errors.currentPassword && (
            <div className="text-red-600 text-xs mt-1">
              {formik.errors.currentPassword}
            </div>
          )}
        </div>
        <div className="mt-4">
          <label className="block font-medium text-sm" htmlFor="newPassword">
            New Password
          </label>
          <div className="w-full border border-light-active rounded-md flex items-center">
            <input
              type={showNewPassword ? "text" : "password"}
              name="newPassword"
              id="newPassword"
              placeholder="Enter your password"
              className="w-full outline-none border-none h-14 px-4 text-sm placeholder:text-light-aborder-light-active"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.newPassword}
            />
            {showNewPassword ? (
              <button
                type="button"
                className="mr-4 cursor-pointer"
                onClick={() => setShowNewPassword((prev) => !prev)}
              >
                <Eye className="w-5" />
              </button>
            ) : (
              <button
                type="button"
                className="mr-4 cursor-pointer"
                onClick={() => setShowNewPassword((prev) => !prev)}
              >
                <EyeOff className="w-5" />
              </button>
            )}
          </div>
          {formik.touched.newPassword && formik.errors.newPassword && (
            <div className="text-red-600 text-xs mt-1">
              {formik.errors.newPassword}
            </div>
          )}
        </div>
        <div className="mt-4">
          <label
            className="block font-medium text-sm"
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>
          <div className="w-full border border-light-active rounded-md flex items-center">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Enter your password"
              className="w-full outline-none border-none h-14 px-4 text-sm placeholder:text-light-aborder-light-active"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
            />
            {showConfirmPassword ? (
              <button
                type="button"
                className="mr-4 cursor-pointer"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                <Eye className="w-5" />
              </button>
            ) : (
              <button
                type="button"
                className="mr-4 cursor-pointer"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                <EyeOff className="w-5" />
              </button>
            )}
          </div>
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <div className="text-red-600 text-xs mt-1">
              {formik.errors.confirmPassword}
            </div>
          )}
        </div>

        <div className="lg:mt-6 mt-4 flex flex-col lg:flex-row items-center gap-2 py-4">
          <button className="lg:w-1/2 w-full rounded-[6px] h-12 bg-primary text-white text-lg font-semibold outline-none cursor-pointer">
            Save Changes
          </button>
          <button
            className="lg:w-1/2 w-full rounded-[6px] h-12 border border-primary text-primary text-lg font-semibold outline-none cursor-pointer"
            onClick={() => router.back()}
          >
            Cancel
          </button>
        </div>
      </form>

      <div className="lg:mt-6 mt-4 w-full flex justify-end">
        <button className="outline-none cursor-pointer">
          <Trash2 className="text-[#E53E3E]" />
        </button>
      </div>
    </div>
  );
};

export default security;
