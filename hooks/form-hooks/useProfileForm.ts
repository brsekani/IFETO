import { ProfileEditSchema } from "@/lib/schema";
import { useFormik } from "formik";
import { useGetProfileQuery, useUpdateProfileMutation } from "@/lib/api/profile";
import { showErrorToast, showSuccessToast } from "@/app/utils/toastHelpers";
import { useRouter } from "next/navigation";
const useProfileForm = () => {
  const { data: profileData } = useGetProfileQuery();
  const user = profileData?.data
    const router = useRouter();

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const formik = useFormik({
    initialValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      phone: user?.phone || "",
    },
    enableReinitialize: true,
    validationSchema: ProfileEditSchema,
    onSubmit: async (values) => {
      try {
        const payload = {
            firstName: values.firstName,
            lastName: values.lastName,
            phone: String(values.phone)
        }

        await updateProfile(payload).unwrap();
        showSuccessToast("Profile updated successfully");
        router.back();
      } catch (error) {
        console.error("Failed to update profile", error);
        showErrorToast("Failed to update profile");
      }
    },
  });
  return { formik, isLoading, user, router };
};

export default useProfileForm;
