import { SecuritySchema } from "@/lib/schema";
import { useFormik } from "formik";
import { useState } from "react";

const useSecurityForm = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: SecuritySchema,
    onSubmit: async (values) => {
      console.log(values);
    },
  });
  return {
    formik,
    showCurrentPassword,
    setShowCurrentPassword,
    showNewPassword,
    setShowNewPassword,
    showConfirmPassword,
    setShowConfirmPassword,
  };
};

export default useSecurityForm;
