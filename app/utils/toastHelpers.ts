import toast from "react-hot-toast";
import { Check, X } from "lucide-react"; // Add X icon for errors too

export const showSuccessToast = (message: string) => {
  toast.success(message, {
    position: window.innerWidth > 768 ? "top-right" : "top-center",
    duration: 3000,
  });
};

/**
 * Shows a standard error toast with responsive positioning.
 */
export const showErrorToast = (message: string) => {
  toast.error(message, {
    position: window.innerWidth > 768 ? "top-right" : "top-center",
    duration: 5000,
  });
};
