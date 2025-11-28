import { useFormik } from "formik";
import { LoginSchema } from "@/lib/schema";
import { useRouter } from "next/navigation";

const useLogin = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      console.log("Login form values", values);
      // TODO: replace with actual login flow
      router.push("/");
    },
  });

  return { formik };
};

export default useLogin;
