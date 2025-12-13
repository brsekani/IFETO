"use client";
import { ChevronLeft } from "lucide-react";
import UserIcon from "@/assets/icons/user.svg";
import Image from "next/image";
import useProfileForm from "@/hooks/form-hooks/useProfileForm";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const edit = () => {

  const { formik, isLoading, user, router } = useProfileForm();
  
  return (
    <div className="w-full h-full lg:shadow-custom2 bg-white lg:rounded-2xl p-6">
      <div className="lg:block flex items-center gap-2 w-full justify-between">
        <button
          className=" flex items-center gap-2 outline-none text-light cursor-pointer"
          onClick={() => router.back()}
        >
          <ChevronLeft className="w-4" />
          <span className="font-medium">back</span>
        </button>

        <div className="flex items-center gap-2 lg:mt-6">
          <Image
            src={UserIcon}
            alt="user icon"
            className="w-6 hidden lg:block"
          />
          <span className="lg:text-2xl text-xl font-semibold ">Edit Profile</span>
        </div>
        <div className="lg:hidden"></div>
      </div>

      <div className="mt-6 py-7 px-6 flex items-center gap-4 bg-[#E3FFEF]">
        <div className="rounded-full p-5 bg-primary text-white text-lg lg:text-2xl">
          {user?.firstName ? user?.firstName.charAt(0) : "U"}
          {user?.lastName ? user?.lastName.charAt(0) : ""}
        </div>
        <div className="">
          <h2 className="text-lg lg:text-2xl font-semibold">
            {user?.firstName} {user?.lastName}
          </h2>
          <h4 className="mt-2 lg:text-sm text-xs text-light">{user?.email}</h4> 
        </div>
      </div>

      <form className="mt-4" onSubmit={formik.handleSubmit}>
        <div className="">
          <label className="block font-medium text-sm" htmlFor="firstName">
            First Name
          </label>
          <div className="w-full border border-light-active rounded-md ">
            <input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="Enter your first name"
              className="w-full outline-none border-none h-14 px-4 text-sm placeholder:text-light-aborder-light-active"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstName}
            />
          </div>
          {formik.touched.firstName && formik.errors.firstName && (
            <div className="text-red-600 text-xs mt-1">
              {formik.errors.firstName}
            </div>
          )}
        </div>

        <div className="lg:mt-4 mt-2">
          <label className="block font-medium text-sm" htmlFor="lastName">
            Last Name
          </label>
          <div className="w-full border border-light-active rounded-md ">
            <input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Enter your last name"
              className="w-full outline-none border-none h-14 px-4 text-sm placeholder:text-light-aborder-light-active"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastName}
            />
          </div>
          {formik.touched.lastName && formik.errors.lastName && (
            <div className="text-red-600 text-xs mt-1">
              {formik.errors.lastName}
            </div>
          )}
        </div>

        <div className="lg:mt-4 mt-2">
          <label className="block font-medium text-sm" htmlFor="phone">
            Phone Number
          </label>
          {/* Phone Input */}
            <PhoneInput
              placeholder="1234567890"
              country={"us"}
              value={formik.values.phone}
              onChange={(value) => formik.setFieldValue("phone", value)}
              onBlur={() => formik.setFieldTouched("phone", true)}
              containerStyle={{
                width: "100%",
                height: "56px", 
                border: "1px solid #E0E0E0", // Match light-active usually
                borderRadius: "6px"
              }}
              inputStyle={{
                width: "100%",
                outline: "none",
                height: "54px", // slightly less to fit
                fontSize: "14px",
                border: "none",
              }}
              buttonStyle={{
                background: "transparent",
                border: "none",
                borderRight: "1px solid #E0E0E0"
              }}
            />
          {formik.touched.phone && formik.errors.phone && (
            <div className="text-red-600 text-xs mt-1">
              {formik.errors.phone}
            </div>
          )}
        </div>

        <div className="lg:mt-6 mt-4 flex flex-col lg:flex-row items-center gap-2 py-4">
          <button 
           disabled={isLoading}
           className={`lg:w-1/2 w-full rounded-[6px] h-12 bg-primary text-white text-lg font-semibold outline-none cursor-pointer ${
             isLoading ? "opacity-70 cursor-not-allowed" : ""
           }`}
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
          <button
            type="button"
            className="lg:w-1/2 w-full rounded-[6px] h-12 border border-primary text-primary text-lg font-semibold outline-none cursor-pointer"
            onClick={() => router.back()}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default edit;
