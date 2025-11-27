import { useFormik } from "formik";
import { SignupSchema } from "@/lib/schema";
import { useRouter } from "next/navigation";
import { useState } from "react";

const useSignup = () => {
  const [secondForm, setSecondForm] = useState(false);
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      console.log("Form data", values);
      router.push("/auth/signup/verify");
    },
  });
  return { formik, secondForm, setSecondForm };
};

export default useSignup;
