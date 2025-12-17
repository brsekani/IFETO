import { useFormik } from "formik";
import { ContactFormSchema } from "@/lib/schema";
import { useSendContactMessageMutation } from "@/lib/api/contact";
import toast from "react-hot-toast";

const useContactForm = () => {
  const [sendContactMessage, { isLoading }] = useSendContactMessageMutation();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    },
    validationSchema: ContactFormSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await sendContactMessage(values).unwrap();
        toast.success(response.message || "Message sent successfully!");
        resetForm();
      } catch (error: any) {
        toast.error(
          error?.data?.message || "Failed to send message. Please try again."
        );
      }
    },
  });
  return { formik, isLoading };
};

export default useContactForm;
