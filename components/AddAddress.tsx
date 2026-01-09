import React from "react";
import Image from "next/image";
import { Formik, Form } from "formik";
import close from "@/assets/icons/Close.svg";
import { addAddressSchema } from "@/lib/schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

type AddAddressProps = {
  onClose: () => void;
};

export default function AddAddress({ onClose }: AddAddressProps) {
  return (
    <div className="w-full bg-white overflow-y-scroll py-8 px-6 space-y-[30px] flex-1">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-[22px] font-semibold text-[#2A2A2A]">
          Add Address
        </h2>
        <Image
          src={close}
          alt="close"
          onClick={onClose}
          className="cursor-pointer"
        />
      </div>

      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          phone: "",
          addressLabel: "",
          address1: "",
          address2: "",
          state: "",
          city: "",
          zip: "",
        }}
        validationSchema={addAddressSchema}
        onSubmit={(values) => console.log(values)}
      >
        {({
          errors,
          touched,
          handleChange,
          handleBlur,
          setFieldValue,
          setFieldTouched,
          values,
        }) => (
          <Form className="space-y-4">
            {/* First & Last Name */}
            <div className="flex items-center flex-col md:flex-row gap-4">
              <div className="w-full">
                <label className="form-label">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  name="firstName"
                  placeholder="Enter your first name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="form-input mt-2"
                />
                {touched.firstName && errors.firstName && (
                  <p className="form-error">{errors.firstName}</p>
                )}
              </div>

              <div className="w-full">
                <label className="form-label">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  name="lastName"
                  placeholder="Enter your last name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="form-input mt-2"
                />
                {touched.lastName && errors.lastName && (
                  <p className="form-error">{errors.lastName}</p>
                )}
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block font-medium text-sm" htmlFor="phone">
                Phone Number
              </label>

              <PhoneInput
                placeholder="1234567890"
                country={"us"}
                value={values.phone}
                onChange={(value) => setFieldValue("phone", value)}
                onBlur={() => setFieldTouched("phone", true)}
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
              {touched.phone && errors.phone && (
                <div className="form-error">{errors.phone}</div>
              )}
            </div>

            {/* Country */}
            <div>
              <label className="form-label">Country</label>
              <input
                value="United States"
                disabled
                className="form-input form-input-disabled mt-2"
              />
              <p className="text-xs text-[#6B7280] mt-2">
                Country has been set from the user’s saved details.
              </p>
            </div>

            {/* Address Label */}
            <div>
              <label className="form-label">Address Label (Optional)</label>

              <Select
                onValueChange={(value) => {
                  setFieldValue("addressLabel", value);
                  setFieldTouched("addressLabel", true);
                }}
              >
                <SelectTrigger className="form-input mt-2">
                  <SelectValue placeholder="Select address label" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="home">Home</SelectItem>
                  <SelectItem value="work">Work</SelectItem>
                  <SelectItem value="others">Others</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Address Line 1 */}
            <div>
              <label className="form-label">
                Address Line 1 <span className="text-red-500">*</span>
              </label>
              <input
                name="address1"
                placeholder="Enter your street address, P.O box, company name"
                onChange={handleChange}
                onBlur={handleBlur}
                className="form-input mt-2"
              />
              {touched.address1 && errors.address1 && (
                <p className="form-error">{errors.address1}</p>
              )}
            </div>

            {/* Address Line 2 */}
            <div>
              <label className="form-label">Address Line 2 (Optional)</label>
              <input
                name="address2"
                placeholder="Apartment, suite, unit, etc."
                onChange={handleChange}
                onBlur={handleBlur}
                className="form-input mt-2"
              />
            </div>

            {/* State / City / Zip */}
            <div className="flex items-center md:flex-row flex-col gap-4">
              <div className="w-full">
                <label className="form-label block truncate max-w-full">
                  State/Region <span className="text-red-500">*</span>
                </label>
                <input
                  name="state"
                  placeholder="Enter state/region"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="form-input mt-2"
                />

                {touched.state && errors.state && (
                  <p className="form-error">{errors.state}</p>
                )}
              </div>

              <div className="w-full">
                <label className="form-label block truncate max-w-full">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  name="city"
                  placeholder="Enter city"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="form-input mt-2"
                />
                {touched.city && errors.city && (
                  <p className="form-error">{errors.city}</p>
                )}
              </div>

              <div className="w-full">
                <label className="form-label block truncate max-w-full">
                  Zip/Postal Code <span className="text-red-500">*</span>
                </label>
                <input
                  name="zip"
                  placeholder="Enter zip/postal code"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="form-input mt-2"
                />

                {touched.zip && errors.zip && (
                  <p className="form-error">{errors.zip}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full h-[52px] mt-6 rounded-md
              bg-[#2DB463] text-white text-[18px] leading-7 font-semibold
              hover:bg-[#249B54] transition cursor-pointer"
            >
              Add Address
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
