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

  // ✅ SAFE redirect path
  const rawRedirect = searchParams.get("redirect");
  const redirectPath =
    rawRedirect && rawRedirect.startsWith("/") ? rawRedirect : "/checkout";

  const formik = useFormik({
    initialValues: {
      email: "lawaltemidayo06+4@gmail.com",
      password: "Testpass123",
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
            }),
          );

          // ✅ Redirect AFTER successful login
          router.replace(redirectPath);
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
