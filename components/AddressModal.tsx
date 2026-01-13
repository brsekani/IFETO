import React from "react";
import Modal from "./ui/modal";
import { ChevronLeft, X } from "lucide-react";
import { useAddressForm, AddressFormData } from "@/hooks/useAddressForm";

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData: any | null;
  isLoading?: boolean;
}

const InputField = ({
  label,
  name,
  formik,
  placeholder,
  type = "text",
  required = false,
}: {
  label: string;
  name: keyof AddressFormData;
  formik: any;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) => (
  <div className="flex flex-col gap-1.5 w-full">
    <label htmlFor={name} className="text-sm font-medium text-dark">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      placeholder={placeholder}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values[name]}
      className={`w-full px-4 py-3 h-14 rounded-[6px] border focus:outline-none transition-all duration-200  text-dark placeholder:text-[#A0A0A0] text-sm ${
        formik.touched[name] && formik.errors[name]
          ? "border-red-500  bg-red-50"
          : "border-[#E0E0E0] focus:border-primary"
      }`}
    />
    {formik.touched[name] && formik.errors[name] && (
      <span className="text-xs text-red-500 font-medium ">
        {formik.errors[name]}
      </span>
    )}
  </div>
);

const AddressModal: React.FC<AddressModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  isLoading = false,
}) => {
  const formik = useAddressForm({ initialData, onSave });

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[600px] w-full">
      <button
        className="cursor-pointer flex items-center gap-2 text-light"
        onClick={onClose}
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="text font-medium">back</span>
      </button>
      <h2 className="text-xl lg:text-2xl font-semibold text-dark my-6 ">
        {initialData ? "Edit Address" : "Add New Address"}
      </h2>

      <form
        onSubmit={formik.handleSubmit}
        className="max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar"
      >
        <div className="grid gap-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4 w-full">
            <div className="w-full">
              <InputField
                label="First Name"
                name="firstname"
                formik={formik}
                required
                placeholder="First Name"
              />
            </div>
            <div className="w-full">
              <InputField
                label="Last Name"
                name="lastname"
                formik={formik}
                required
                placeholder="Last Name"
              />
            </div>
          </div>

          <div className=" w-full">
            <InputField
              label="Phone Number"
              name="phone"
              formik={formik}
              required
              placeholder="+234..."
            />
          </div>

          <div className=" w-full">
            <InputField
              label="Address Label (Optional)"
              name="label"
              formik={formik}
              placeholder="e.g. Home, Work"
            />
          </div>

          <div className=" w-full">
            <InputField
              label="Address Line 1"
              name="address1"
              formik={formik}
              required
              placeholder="Street address, P.O. box, company name"
            />
          </div>

          <div className=" w-full">
            <InputField
              label="Address Line 2 (Optional)"
              name="address2"
              formik={formik}
              placeholder="Apartment, suite, unit, building, floor, etc."
            />
          </div>

          <div className="w-full">
            <InputField
              label="City"
              name="city"
              formik={formik}
              required
              placeholder="City"
            />
          </div>
          <div className="w-full">
            <InputField
              label="State / Region"
              name="state"
              formik={formik}
              required
              placeholder="State"
            />
          </div>
          <div className="w-full">
            <InputField
              label="Country"
              name="country"
              formik={formik}
              required
              placeholder="Country"
            />
          </div>
          <div className="w-full">
            <InputField
              label="Zip Code"
              name="zipCode"
              formik={formik}
              required
              placeholder="Zip Code"
            />
          </div>
        </div>

        <div className="flex gap-4 pt-4 border-t border-[#EBEBEB]">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-3 rounded-[6px] h-12 text-lg border border-primary text-primary font-semibold hover:bg-primary/5 transition-colors duration-300 "
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className={`flex-1 px-4 py-3 rounded-[6px] h-12 text-lg bg-primary text-white font-semibold hover:bg-green-600 transition-colors duration-300 shadow-sm ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddressModal;
