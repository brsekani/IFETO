import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";

export interface AddressFormData {
  firstname: string;
  lastname: string;
  phone: string;
  label: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

interface UseAddressFormProps {
  initialData: any | null;
  onSave: (data: any) => void;
}

export const useAddressForm = ({
  initialData,
  onSave,
}: UseAddressFormProps) => {
  const validationSchema = Yup.object({
    firstname: Yup.string().required("First name is required"),
    lastname: Yup.string().required("Last name is required"),
    phone: Yup.string().required("Phone number is required"),
    label: Yup.string().optional(),
    address1: Yup.string().required("Address Line 1 is required"),
    address2: Yup.string().optional(),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State/Region is required"),
    country: Yup.string().required("Country is required"),
    zipCode: Yup.string().required("Zip code is required"),
  });

  const formik = useFormik<AddressFormData>({
    initialValues: {
      firstname: "",
      lastname: "",
      phone: "",
      label: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      country: "",
      zipCode: "",
    },
    validationSchema,
    onSubmit: (values) => {
      onSave(values);
      formik.resetForm();
    },
  });

  useEffect(() => {
    if (initialData) {
      formik.setValues({
        firstname: initialData.firstname || "",
        lastname: initialData.lastname || "",
        phone: initialData.phone || "",
        label: initialData.label || "",
        address1: initialData.address1 || "",
        address2: initialData.address2 || "",
        city: initialData.city || "",
        state: initialData.state || "",
        country: initialData.country || "",
        zipCode: initialData.zipCode || "",
      });
    } else {
      formik.resetForm();
    }
  }, [initialData]);

  return formik;
};
