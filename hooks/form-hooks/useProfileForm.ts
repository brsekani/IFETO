import { ProfileEditSchema } from "@/lib/schema";
import { useFormik } from "formik";
const useProfileForm = () => {
  const formik = useFormik({
    initialValues: {
      name: "Elizabeth Odiai",
      phone: 9176715839,
      country: "United State",
    },
    validationSchema: ProfileEditSchema,
    onSubmit: async (values) => {
      console.log(values);
    },
  });
  return { formik };
};

export default useProfileForm;
