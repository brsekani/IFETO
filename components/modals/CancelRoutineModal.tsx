import React from "react";
import Image from "next/image";
import { TriangleAlert, Loader2 } from "lucide-react";
import Modal from "../ui/modal";

interface ModalItem {
  id?: number | string;
  name: string;
  image: any;
  priceDisplay: string;
  description: string;
}

interface CancelRoutineModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  items: ModalItem[];
  title?: string;
  isLoading?: boolean;
}

const CancelRoutineModal: React.FC<CancelRoutineModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  items,
  title,
  isLoading,
}) => {
  if (!items || items.length === 0) return null;

  const firstItem = items[0];

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex justify-center items-center flex-col font-nunito text-center">
        <div className="rounded-full bg-[#E53E3E] text-white p-5 w-fit">
          <TriangleAlert />
        </div>
        <h3 className="text-xl font-semibold mt-4">
          {title || "Cancel routine order?"}
        </h3>
        <p className="mt-2 text-sm lg:text-base text-light">
          You won't receive future deliveries for this item unless you create a
          new routine order.
        </p>
      </div>

      <div className="mt-6 border border-[#E5E5E5] rounded-2xl p-4">
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <div className="w-[71px] h-[66px] bg-[#EFEEEE] rounded-[4px] p-1 shrink-0 relative flex items-center justify-center overflow-hidden">
              {firstItem.image ? (
                <Image
                  src={firstItem.image}
                  alt={firstItem.name}
                  fill
                  className="object-contain p-1"
                />
              ) : (
                <span className="text-[10px] text-gray-400">No Image</span>
              )}
            </div>
            <div className="space-y-1 w-full text-left">
              <div className="flex items-center justify-between gap-2 font-nunito">
                <h2 className="font-semibold text-sm text-[#5a5a5a]">
                  {firstItem.name}
                </h2>
                <h2 className="font-semibold text-sm text-[#5a5a5a] text-right">
                  {firstItem.priceDisplay}
                </h2>
              </div>
              <h2 className="text-light text-xs font-nunito">
                {firstItem.description}
              </h2>
            </div>
          </div>

          {items.length > 1 && (
            <div className="text-center text-xs text-light font-nunito border-t border-[#E5E5E5] pt-3 mt-1">
              + {items.length - 1} more item
              {items.length > 2 ? "s" : ""}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-8 font-nunito">
        <button
          onClick={onConfirm}
          disabled={isLoading}
          className="w-full h-12 rounded-[6px] bg-[#E53E3E] text-white text-lg font-semibold cursor-pointer hover:bg-[#c53030] transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Canceling...</span>
            </>
          ) : (
            "Yes, cancel routine order"
          )}
        </button>
        <button
          onClick={onClose}
          disabled={isLoading}
          className="w-full h-12 rounded-[6px] border border-primary text-primary text-lg font-semibold cursor-pointer hover:bg-[#E3FFEF] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Keep routine order
        </button>
      </div>
    </Modal>
  );
};
export default CancelRoutineModal;
