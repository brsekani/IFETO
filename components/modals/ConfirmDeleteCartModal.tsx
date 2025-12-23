import { motion } from "framer-motion";
import React from "react";
import ButtonLoader from "../loaders/ButtonLoader";

interface ConfirmDeleteCartModalProps {
  itemToDelete: string | null;
  handleRemoveItem: (id: string) => Promise<void>;
  setDeleteModalOpen: (open: boolean) => void;
  setItemToDelete: (id: string | null) => void;
  loading?: boolean;
}

export default function ConfirmDeleteCartModal({
  setDeleteModalOpen,
  setItemToDelete,
  itemToDelete,
  handleRemoveItem,
  loading,
}: ConfirmDeleteCartModalProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-lg w-[90%] max-w-[445px] p-6 text-center"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        <h3 className="text-[18px] leading-7 font-semibold text-[#2A2A2A]">
          Remove item from cart?
        </h3>

        <p className="text-[16px] leading-6 text-[#787878] mt-4">
          This item will be removed from your cart, but you can always add it
          back later.
        </p>

        <div className="flex gap-3 mt-8 text-[18px] leading-7">
          <button
            onClick={async () => {
              console.log(itemToDelete);
              if (!itemToDelete || loading) return;

              await handleRemoveItem(itemToDelete);
              setDeleteModalOpen(false);
              setItemToDelete(null);
            }}
            disabled={loading}
            className="
      px-2 py-2.5 w-full rounded-md
      bg-[#E53E3E] text-white
      flex items-center justify-center gap-2
      disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer
    "
          >
            {loading ? <ButtonLoader /> : "Remove"}
          </button>

          <button
            onClick={() => {
              if (loading) return;
              setDeleteModalOpen(false);
              setItemToDelete(null);
            }}
            disabled={loading}
            className="
      px-2 py-2.5 w-full rounded-md
      border border-[#27AE60] text-[#27AE60]
      disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer
    "
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
