import { useFormik } from "formik";
import { LoginSchema } from "@/lib/schema";
import { useRouter, useSearchParams } from "next/navigation";
import { showErrorToast, showSuccessToast } from "@/app/utils/toastHelpers";
import { useLoginMutation } from "@/lib/api/auth";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/lib/authSlice";

const useLogin = () => {
  const [login, { isLoading: isLogining }] = useLoginMutation();
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();

  const redirectPath = searchParams.get("redirect");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      try {
        const result = await login(values).unwrap();

        if (result.success) {
          showSuccessToast(result.message);

          // Store ONLY the access token
          dispatch(
            setCredentials({
              accessToken: result.data.accessToken,
            })
          );

          // Redirect to protected page or home
          if (redirectPath) {
            router.replace(redirectPath);
          } else {
            router.replace("/");
          }
        }
      } catch (err: any) {
        const errorMessage =
          err?.data?.message ||
          err?.error ||
          "Login failed. Please check your credentials.";
        showErrorToast(errorMessage);
      }
    },
  });

  return { formik, isLogining };
};

export default useLogin;
