import React from "react";
import Modal from "./ui/modal";

interface DeleteAddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteAddressModal: React.FC<DeleteAddressModalProps> = ({
  isOpen,
  onClose,
  onDelete,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[500px]">
      <div className="flex flex-col items-center justify-center py-6">
        <h2 className="text-xl font-bold text-dark font-nunito mb-2">
          Delete Address
        </h2>
        <p className="text-[#5A5A5A] font-nunito text-center mb-8 max-w-[350px]">
          This address will be permanently removed from your saved locations.
        </p>

        <div className="flex gap-4 w-full">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 h-12 rounded-[6px] border border-primary text-primary font-semibold hover:bg-primary/5 transition-colors duration-300 font-nunito text-lg"
          >
            Cancel
          </button>
          <button
            onClick={onDelete}
            className="flex-1 px-4 py-3 h-12 rounded-[6px] bg-[#E53E3E] text-white font-semibold hover:bg-[#C53030] transition-colors duration-300 font-nunito text-lg shadow-sm"
          >
            Delete Address
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteAddressModal;
