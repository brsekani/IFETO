import { useFormik } from "formik";
import { VerifyCodeSchema } from "@/lib/schema";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const useVerify = () => {
  const router = useRouter();
  const [resendTimer, setResendTimer] = useState(0);
  const [isResending, setIsResending] = useState(false);
  const [isVerified, setIsVerified] = useState(false);


  const formik = useFormik({
    initialValues: {
      code1: "",
      code2: "",
      code3: "",
      code4: "",
      code5: "",
      code6: "",
    },
    validationSchema: VerifyCodeSchema,
    onSubmit: (values) => {
      const code = Object.values(values).join("");
      console.log("Verification code", code);
      setIsVerified(true);
    },
  });

  useEffect(() => {
    if (!resendTimer) return;

    const interval = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleResendCode = async () => {
    if (resendTimer > 0 || isResending) return;

    setIsResending(true);
    setResendTimer(59);

    try {
      // TODO: Dispatch resend verification API request
      console.log("Dispatching resend verification code request");
    } catch (error) {
      console.error("Failed to resend verification code", error);
      setResendTimer(0);
    } finally {
      setIsResending(false);
    }
  };

  const isResendDisabled = resendTimer > 0 || isResending;

  return { formik, resendTimer, handleResendCode, isResendDisabled, isVerified, setIsVerified, router };
};

export default useVerify;
