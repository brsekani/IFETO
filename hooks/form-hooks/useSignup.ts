import { useFormik } from "formik";
import { SignupSchema } from "@/lib/schema";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSignupMutation } from "@/lib/api/auth";
import { showErrorToast, showSuccessToast } from "@/app/utils/toastHelpers";

const useSignup = () => {
  const [secondForm, setSecondForm] = useState(false);
  const router = useRouter();

  const [signup, { isLoading }] = useSignupMutation();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
    },
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      try {
        const result = await signup(values).unwrap();
        console.log(result);

        if (result.success) {
          const { id } = result.data.newUser;
          showSuccessToast(result.message);

          // Optional: Redirect to a verification page
          router.push(
            `/auth/signup/verify?userId=${id}&email=${encodeURIComponent(
              values.email
            )}`
          );
        }
      } catch (err: any) {
        console.error("Signup Failed:", err);

        const errorMessage =
          err?.data?.message ||
          err?.error ||
          "An unexpected error occurred during signup.";
        showErrorToast(errorMessage);
      }
    },
  });
  return { formik, secondForm, setSecondForm, isLoading };
};

export default useSignup;
