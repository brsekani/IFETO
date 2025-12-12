"use client";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import UserIcon from "@/assets/icons/user.svg";
import Image from "next/image";
import useProfileForm from "@/hooks/form-hooks/useProfileForm";

const edit = () => {
  const router = useRouter();
  const { formik } = useProfileForm();
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
          EO
        </div>
        <div className="">
          <h2 className="text-lg lg:text-2xl font-semibold">Elizabeth Odiai</h2>
          <h4 className="mt-2 lg:text-sm text-xs text-light">Lizziefavour@gmail.com</h4>
        </div>
      </div>

      <form className="mt-4" onSubmit={formik.handleSubmit}>
        <div className="">
          <label className="block font-medium text-sm" htmlFor="name">
            Name
          </label>
          <div className="w-full border border-light-active rounded-md ">
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter your name"
              className="w-full outline-none border-none h-14 px-4 text-sm placeholder:text-light-aborder-light-active"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
          </div>
          {formik.touched.name && formik.errors.name && (
            <div className="text-red-600 text-xs mt-1">
              {formik.errors.name}
            </div>
          )}
        </div>
        <div className="lg:mt-4 mt-2">
          <label className="block font-medium text-sm" htmlFor="phone">
            Phone Number
          </label>
          <div className="w-full border border-light-active rounded-md ">
            <input
              type="number"
              name="phone"
              id="phone"
              placeholder="Enter your phone number"
              className="w-full outline-none border-none h-14 px-4 text-sm placeholder:text-light-aborder-light-active appearance-none"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
            />
          </div>
          {formik.touched.phone && formik.errors.phone && (
            <div className="text-red-600 text-xs mt-1">
              {formik.errors.phone}
            </div>
          )}
        </div>
        <div className="lg:mt-4 mt-2">
          <label className="block font-medium text-sm" htmlFor="country">
            Country
          </label>
          <div className="w-full border border-light-active rounded-md ">
            <input
              type="text"
              name="country"
              id="country"
              placeholder="Enter your country "
              className="w-full outline-none border-none h-14 px-4 text-sm placeholder:text-light-aborder-light-active"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.country}
            />
          </div>
          {formik.touched.country && formik.errors.country && (
            <div className="text-red-600 text-xs mt-1">
              {formik.errors.country}
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
    </div>
  );
};

export default edit;
