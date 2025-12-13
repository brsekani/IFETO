import { SecuritySchema, DeleteAccountSchema } from "@/lib/schema";
import { useFormik } from "formik";
import { useState } from "react";
import { useChangePasswordMutation, useDeleteAccountMutation } from "@/lib/api/profile";
import { showErrorToast, showSuccessToast } from "@/app/utils/toastHelpers";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logOut } from "@/lib/authSlice";

const useSecurityForm = () => {
    const router = useRouter();
    const dispatch = useDispatch();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Modal states
  const [showReasonModal, setShowReasonModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const [deleteAccount, { isLoading: isDeleting }] = useDeleteAccountMutation();

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: SecuritySchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await changePassword({
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
          confirmPassword: values.confirmPassword,
        }).unwrap();
        showSuccessToast("Password changed successfully");
        resetForm();
        router.back();
      } catch (error: any) {
        console.error("Failed to change password", error);
        const message = error?.data?.message || "Failed to change password";
        showErrorToast(message);
      }
    },
  });

  const deleteFormik = useFormik({
    initialValues: {
      reason: "",
      otherReason: "",
      password: "",
    },
    validationSchema: DeleteAccountSchema,
    onSubmit: async (values, { resetForm }) => {
        try {
            const reason = values.reason === "Others" ? values.otherReason : values.reason;
            await deleteAccount({ 
                reason, 
                password: values.password 
            }).unwrap();
            
            showSuccessToast("Account deleted successfully");
            setShowConfirmModal(false);
            setShowSuccessModal(true);
            resetForm();
            // We do NOT logout yet, waiting for user to click button in Success Modal
          } catch (error: any) {
            console.error("Failed to delete account", error);
            const message = error?.data?.message || "Failed to delete account";
            showErrorToast(message);
          }
    }
  })

  
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleDeleteInitiate = () => {
    setShowReasonModal(true);
  };

  const handleReasonSubmit = async () => {
    // Manually mark field as touched to trigger validation if empty
    deleteFormik.setFieldTouched('reason', true);

    if (!deleteFormik.values.reason) {
        // Validation handled by Formik, but we prevent transition
        return;
    }
    
    if (deleteFormik.values.reason === "Others") {
        deleteFormik.setFieldTouched('otherReason', true);
        if (!deleteFormik.values.otherReason.trim()) {
            return;
        }
    }

    setShowReasonModal(false);
    setShowConfirmModal(true);
  };

  const handleReturnToHomepage = () => {
    dispatch(logOut());
    router.push('/'); 
  }

  const closeModals = () => {
    setShowReasonModal(false);
    setShowConfirmModal(false);
    setShowSuccessModal(false);
    deleteFormik.resetForm();
  };

  return {
    formik,
    deleteFormik,
    showCurrentPassword,
    setShowCurrentPassword,
    showNewPassword,
    setShowNewPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    isLoading,
    router,
    isDeleting,
    showReasonModal,
    showConfirmModal,
    showSuccessModal,
    handleDeleteInitiate,
    handleReasonSubmit,
    handleReturnToHomepage,
    closeModals
  };
};

export default useSecurityForm;


