import { useFormik } from "formik";
import { ContactFormSchema } from "@/lib/schema";

const useContactForm = () => {

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    },
    validationSchema: ContactFormSchema,
    onSubmit: async (values) => {
      console.log(values);
    },
  });
  return { formik };
};

export default useContactForm;
