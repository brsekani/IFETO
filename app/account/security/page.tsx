"use client";
import {
  ChevronLeft,
  CircleCheck,
  Eye,
  EyeOff,
  LockKeyhole,
  Trash2,
  TriangleAlert,
} from "lucide-react";

import useSecurityForm from "@/hooks/form-hooks/useSecurityForm";
const security = () => {
  const {
    formik,
    setShowConfirmPassword,
    setShowCurrentPassword,
    setShowNewPassword,
    showConfirmPassword,
    showCurrentPassword,
    showNewPassword,
    isLoading,
    router,
    isDeleting,
    showReasonModal,
    showConfirmModal,
    showSuccessModal,
    handleDeleteInitiate,
    handleReasonSubmit,
    handleReturnToHomepage,
    closeModals,
    deleteFormik,
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
                onClick={() => setShowCurrentPassword((prev: boolean) => !prev)}
              >
                <Eye className="w-5" />
              </button>
            ) : (
              <button
                type="button"
                className="mr-4 cursor-pointer"
                onClick={() => setShowCurrentPassword((prev: boolean) => !prev)}
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
          <button
            disabled={isLoading}
            className={` w-full h-12 rounded-md text-center px-5 text-lg  font-semibold cursor-pointer ${
              !formik.isValid || !formik.dirty
                ? "bg-[#C7D3CC] text-white"
                : "bg-primary text-white"
            }`}
          >
            {isLoading ? "Saving..." : "Save Changes"}
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
        <button
          className="outline-none cursor-pointer"
          onClick={handleDeleteInitiate}
        >
          <Trash2 className="text-[#E53E3E]" />
        </button>
      </div>

      {/* Reason Modal */}
      {showReasonModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-[530px]">
            <div className="flex justify-center items-center flex-col">
              <div className="rounded-full bg-[#F59E0B1A] text-[#F59E0B] p-5 w-fit">
                <TriangleAlert />
              </div>
              <h3 className="text-lg font-semibold text-center mt-4">
                Before you go...
              </h3>
              <h4 className="mt-2 text-sm text-light text-center">
                We'd love to understand why you're leaving. Your feedback helps
                us improve.
              </h4>
              <h4 className="mt-4 text-base text-[#5A5A5A] text-center">
                We'd love to understand why you're leaving. Your feedback helps
                us improve.
              </h4>
            </div>
            <div className="space-y-5 mt-4">
              {[
                "Privacy concerns",
                "Not using the service anymore",
                "Found a better alternative",
                "Too many emails/notifications",
                "Account security issues",
                "Others",
              ].map((reason) => (
                <div key={reason} className="flex items-center gap-2">
                  <input
                    type="radio"
                    id={reason}
                    name="reason" // Match Formik field name
                    value={reason}
                    checked={deleteFormik.values.reason === reason}
                    onChange={deleteFormik.handleChange}
                    className="accent-primary w-4 h-4 cursor-pointer outline-none border-none focus:ring-0 focus:outline-none"
                  />
                  <label htmlFor={reason} className="cursor-pointer text-sm">
                    {reason}
                  </label>
                </div>
              ))}
            </div>

            {deleteFormik.touched.reason && deleteFormik.errors.reason && (
              <div className="text-red-600 text-xs mt-1">
                {deleteFormik.errors.reason}
              </div>
            )}

            {deleteFormik.values.reason === "Others" && (
              <div>
                <textarea
                  name="otherReason" // Match Formik field
                  placeholder="Please tell us why..."
                  className="w-full mt-3 p-3 border border-light-active rounded-md outline-none text-sm h-24 resize-none"
                  value={deleteFormik.values.otherReason}
                  onChange={deleteFormik.handleChange}
                  onBlur={deleteFormik.handleBlur}
                />
                {deleteFormik.touched.otherReason &&
                  deleteFormik.errors.otherReason && (
                    <div className="text-red-600 text-xs mt-1">
                      {deleteFormik.errors.otherReason}
                    </div>
                  )}
              </div>
            )}

            <div className="flex gap-3 mt-6">
              <button
                className="w-1/2 h-11 rounded-md border border-light-active text-light font-medium cursor-pointer"
                onClick={closeModals}
              >
                Cancel
              </button>
              <button
                className={`w-1/2 h-11 rounded-md font-medium text-white cursor-pointer
                    ${
                      !deleteFormik.values.reason ||
                      (deleteFormik.values.reason === "Others" &&
                        !deleteFormik.values.otherReason.trim())
                        ? "bg-[#C7D3CC] cursor-not-allowed"
                        : "bg-primary"
                    }
                `}
                onClick={handleReasonSubmit}
                disabled={
                  !deleteFormik.values.reason ||
                  (deleteFormik.values.reason === "Others" &&
                    !deleteFormik.values.otherReason.trim())
                }
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Password Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-[530px]">
            <div className="flex justify-center items-center flex-col">
              <div className="rounded-full bg-[#E53E3E] text-white p-5 w-fit">
                <TriangleAlert />
              </div>
              <h3 className="text-lg font-semibold text-center mt-4">
                Delete Account?
              </h3>
              <p className="mt-4 text-base text-light text-center">
                This action is{" "}
                <span className="text-black font-bold">permanent</span>. All
                your personal data, saved addresses, and shipping history will
                be permanently removed.
              </p>
              <p className="mt-2 text-base text-[#5A5A5A] text-center">
                You will{" "}
                <span className="text-black font-bold">
                  not be able to recover
                </span>{" "}
                your account after deleting it.
              </p>
            </div>

            <label
              className="block font-medium text-sm mt-4"
              htmlFor="password"
            >
              Password
            </label>
            <div className="w-full border border-light-active rounded-md flex items-center mb-6">
              <input
                type={showCurrentPassword ? "text" : "password"}
                placeholder="Enter current password"
                className="w-full outline-none border-none h-12 px-4 text-sm placeholder:text-light-active"
                name="password" // Formik field name
                value={deleteFormik.values.password}
                onChange={deleteFormik.handleChange}
                onBlur={deleteFormik.handleBlur}
              />
              {showCurrentPassword ? (
                <button
                  type="button"
                  className="mr-4 cursor-pointer"
                  onClick={() =>
                    setShowCurrentPassword((prev: boolean) => !prev)
                  }
                >
                  <Eye className="w-5 text-light" />
                </button>
              ) : (
                <button
                  type="button"
                  className="mr-4 cursor-pointer"
                  onClick={() =>
                    setShowCurrentPassword((prev: boolean) => !prev)
                  }
                >
                  <EyeOff className="w-5 text-light" />
                </button>
              )}
            </div>
            {deleteFormik.touched.password && deleteFormik.errors.password && (
              <div className="text-red-600 text-xs mt-1 mb-2">
                {deleteFormik.errors.password}
              </div>
            )}

            <div className="flex gap-3">
              <button
                className={`w-1/2 h-11 rounded-md font-medium text-white disabled:opacity-70 cursor-pointer
                     ${
                       !deleteFormik.values.password ||
                       isDeleting ||
                       !deleteFormik.isValid
                         ? "bg-[#ff9999]"
                         : "bg-[#E53E3E]"
                     }
                `}
                type="button" // Important, manually triggering submit or onClick
                onClick={() => deleteFormik.handleSubmit()}
                disabled={
                  isDeleting ||
                  !deleteFormik.isValid ||
                  !deleteFormik.values.password
                }
              >
                {isDeleting ? "Deleting..." : "Delete Account"}
              </button>
              <button
                className="w-1/2 h-11 rounded-md border border-light-active text-light font-medium cursor-pointer"
                onClick={closeModals}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-[530px] text-center">
            <div className="flex justify-center items-center flex-col">
              <div className="rounded-full bg-[#E3FFEF] text-primary p-5 w-fit">
                <CircleCheck />
              </div>
              <h3 className="text-lg font-semibold text-center mt-4">
                Your account has been deleted
              </h3>
              <p className="mt-4 text-base text-light text-center">
                We're sad to see you go. If you ever return, you can create a
                new account anytime.
              </p>
            </div>
            <button
              className="w-full h-11 rounded-md bg-primary text-white font-medium mt-4"
              onClick={handleReturnToHomepage}
            >
              Return to Homepage
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default security;
