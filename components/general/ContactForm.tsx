import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import emailIcon from "@/assets/icons/mail.svg";
import Image from "next/image";
import useContactForm from "@/hooks/form-hooks/useContactForm";
const ContactForm = () => {
  const { formik } = useContactForm();
  return (
    <form className="mt-8" onSubmit={formik.handleSubmit}>
      <div className="">
        <label className="block font-medium text-sm" htmlFor="firstName">
          First Name
        </label>
        <div className="w-full border border-[#CFCFCF] rounded-md ">
          <input
            type="text"
            name="firstName"
            id="firstName"
            placeholder="Enter your first name"
            className="w-full outline-none border-none h-14 px-4 text-sm placeholder:text-[#CFCFCF]"
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
          <div className="text-red-600 text-xs mt-1">{formik.errors.email}</div>
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
          <div className="text-red-600 text-xs mt-1">{formik.errors.phone}</div>
        )}
      </div>
      <div className="mt-4">
        <label className="block font-medium text-sm" htmlFor="message">
          Message
        </label>
        <div className="w-full border border-[#CFCFCF] rounded-md ">
          <textarea
            name="message"
            id="message"
            className="w-full outline-none border-none h-[120px] px-4 py-2 resize-none text-sm placeholder:text-[#CFCFCF]"
            placeholder="Write a message"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.message}
          ></textarea>
        </div>
        {formik.touched.message && formik.errors.message && (
          <div className="text-red-600 text-xs mt-1">
            {formik.errors.message}
          </div>
        )}
      </div>
      <div className="mt-8">
        <div className="">
          <button
            type="submit"
            className={` w-full h-12 rounded-md text-center px-5 text-lg  font-semibold cursor-pointer ${
              !formik.dirty || !formik.isValid
                ? "bg-[#C7D3CC] text-white"
                : "bg-primary text-white"
            }`}
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default ContactForm;
