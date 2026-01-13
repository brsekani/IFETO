import React from "react";
import { Phone, SquarePen, Trash2 } from "lucide-react";

interface AddressCardProps {
  address: any;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onSetDefault?: (id: string) => void;
  isSettingDefault?: boolean;
}

const AddressCard: React.FC<AddressCardProps> = ({
  address,
  onEdit,
  onDelete,
  onSetDefault,
  isSettingDefault = false,
}) => {
  return (
    <div className="w-full bg-white border border-[#EBEBEB] rounded-2xl p-6 font-nunito hover:border-primary transition-colors duration-300">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-dark mb-1">
          {address.firstname} {address.lastname}
        </h3>
        {address.isDefault && (
          <span className="inline-block mt-2 px-4 py-1 bg-[#2E0BF51A] text-[#2E0BF5] text-base font-semibold rounded-3xl">
            Default Address
          </span>
        )}
      </div>
      <p className="text-[#5A5A5A] text-sm">{address.label}</p>

      <div className="space-y-1 mt-6 mb-4">
        <p className="text-[#5A5A5A] leading-relaxed">
          {address.address1}
          {address.address2 ? `, ${address.address2}` : ""} <br />
          {address.city}, {address.state} <br />
          {address.country}, {address.zipCode}
        </p>
        <p className="text-[#5A5A5A] flex items-center gap-2 mt-2">
          <Phone className="w-4 h-4" /> {address.phone}
        </p>
      </div>

      <div className="flex items-center gap-4 pt-4 border-t border-[#EBEBEB]">
        <button
          onClick={() => onEdit(address.id)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-primary text-primary hover:bg-primary/5 transition-colors duration-300"
        >
          <SquarePen className="w-4 h-4" />
          <span className="font-semibold text-base">Edit</span>
        </button>
        <button
          onClick={() => onDelete(address.id)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#E53E3E] text-[#E53E3E] hover:bg-red-50 transition-colors duration-300"
        >
          <Trash2 className="w-4 h-4" />
          <span className="font-semibold text-base">Delete</span>
        </button>
        {!address.isDefault && onSetDefault && (
          <button
            onClick={() => onSetDefault(address.id)}
            disabled={isSettingDefault}
            className={`font-semibold text-primary underline cursor-pointer px-4 hover:text-green-700 transition-colors ${
              isSettingDefault ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSettingDefault ? "Setting..." : "Set as default"}
          </button>
        )}
      </div>
    </div>
  );
};

export default AddressCard;
