import useSignup from "@/hooks/form-hooks/useSignup";
import Image from "next/image";
import Link from "next/link";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import emailIcon from "@/assets/icons/mail.svg";

const SignupForm = ({ formik, setsecondForm }: any) => {
  const canContinue =
    formik.values.firstName &&
    !formik.errors.firstName &&
    formik.values.lastName &&
    !formik.errors.lastName &&
    formik.values.email &&
    !formik.errors.email &&
    formik.values.phone &&
    !formik.errors.phone;
  return (
    <div className="mt-7 lg:mt-0 lg:px-8  lg:py-6 px-6 bg-white lg:shadow-custom rounded-2xl">
      <div className="text-center">
        <h2 className="font-bold font-inter text-2xl text-center">
          Create an Account
        </h2>
        <p className="text-light">
          Please provide the information below to get started
        </p>
      </div>
      <div className="mt-8">
        <form className="" onSubmit={() => setsecondForm(true)}>
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
          <div className="mt-4">
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
          <div className="mt-4">
            <label className="block font-medium text-sm" htmlFor="email">
              Email
            </label>
            <div className="w-full flex border border-light-active rounded-md ">
              <input
                type="text"
                name="email"
                id="email"
                placeholder="Enter your email address"
                className="w-full outline-none border-none h-14 px-4 text-sm placeholder:text-light-aborder-light-active"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              <Image src={emailIcon} alt="icon" className="pr-4 w-fit" />
            </div>
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-600 text-xs mt-1">
                {formik.errors.email}
              </div>
            )}
          </div>
          <div className="mt-4">
            <label className="block font-medium text-sm" htmlFor="phone">
              Phone Number
            </label>

            <PhoneInput
              placeholder="1234567890"
              country={"us"}
              value={formik.values.phone}
              onChange={(value) => formik.setFieldValue("phone", value)}
              onBlur={() => formik.setFieldTouched("phone", true)}
              containerStyle={{
                width: "100%",
                height: "56px",
              }}
              inputStyle={{
                width: "100%",
                outline: "none",
                height: "56px",
                fontSize: "14px",
              }}
              buttonStyle={{
                background: "transparent",
              }}
            />
            {formik.touched.phone && formik.errors.phone && (
              <div className="text-red-600 text-xs mt-1">
                {formik.errors.phone}
              </div>
            )}
          </div>
          <div className="mt-8">
            <div className="">
              <button
                disabled={!canContinue}
                type="submit"
                className={` w-full h-12 rounded-md text-center px-5 text-lg  font-semibold cursor-pointer ${
                  !canContinue
                    ? "bg-[#C7D3CC] text-white"
                    : "bg-primary text-white"
                }`}
              >
                Proceed
              </button>
            </div>
            <div className="flex items-center gap-2 w-full justify-center mt-2.5">
              <span className="font-semibold text-lg">
                Already have an account?
              </span>
              <Link
                href="/auth/login"
                className="text-primary text-lg font-semibold"
              >
                Login
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
