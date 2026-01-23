"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight, Plus } from "lucide-react";
import AddressCard from "@/components/AddressCard";
import AddressModal from "@/components/AddressModal";
import DeleteAddressModal from "@/components/DeleteAddressModal";
import {
  useGetAddressesQuery,
  useAddAddressesMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
  useChangeDefaultAddressesMutation,
} from "@/lib/api/address";
import toast from "react-hot-toast";

const address = () => {
  const { data: addressesResponse, isLoading, error } = useGetAddressesQuery();
  const [addAddress, { isLoading: isAdding }] = useAddAddressesMutation();
  const [updateAddress, { isLoading: isUpdating }] = useUpdateAddressMutation();
  const [deleteAddress, { isLoading: isDeleting }] = useDeleteAddressMutation();
  const [changeDefaultAddress, { isLoading: isChangingDefault }] =
    useChangeDefaultAddressesMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<any | null>(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState<string | null>(null);
  const [settingDefaultId, setSettingDefaultId] = useState<string | null>(null);

  const addresses = addressesResponse?.data || [];

  const handleAddClick = () => {
    setEditingAddress(null);
    setIsModalOpen(true);
  };

  const handleEdit = (id: string) => {
    const addressToEdit = addresses.find((addr) => addr.id === id);
    if (addressToEdit) {
      setEditingAddress(addressToEdit);
      setIsModalOpen(true);
    }
  };

  const handleDelete = (id: string) => {
    setAddressToDelete(id);
    setDeleteModalOpen(true);
  };

  const handleSetDefault = async (id: string) => {
    setSettingDefaultId(id);
    try {
      const response = await changeDefaultAddress(id).unwrap();
      toast.success("Default address updated");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update default address");
    } finally {
      setSettingDefaultId(null);
    }
  };

  const confirmDelete = async () => {
    if (addressToDelete) {
      try {
        await deleteAddress(addressToDelete).unwrap();
        toast.success("Address deleted successfully");
        setDeleteModalOpen(false);
        setAddressToDelete(null);
      } catch (err: any) {
        toast.error(err?.data?.message || "Failed to delete address");
      }
    }
  };

  const handleSave = async (data: any) => {
    try {
      if (editingAddress) {
        await updateAddress({
          id: editingAddress.id,
          data: { ...data, isDefault: editingAddress.isDefault },
        }).unwrap();
        toast.success("Address updated successfully");
      } else {
        await addAddress({ ...data, isDefault: false }).unwrap();
        toast.success("Address added successfully");
      }
      setIsModalOpen(false);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to save address");
    }
  };

  if (error) {
    return (
      <div className="w-full lg:py-7 lg:px-20 md:px-14 px-6 bg-[#FAFAFA] max-w-[1440px] mx-auto min-h-[50vh] flex flex-col justify-center items-center">
        <p className="text-xl font-semibold text-[#EB5757]">
          Failed to load addresses.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-6 py-2 bg-primary text-white rounded-md"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="w-full lg:py-7 lg:px-20 md:px-14 px-6 bg-[#FAFAFA] max-w-[1440px] mx-auto min-h-screen">
      <div className="w-full flex gap-4 items-center text-[#5A5A5A] font-semibold">
        <Link
          href="/"
          className="hover:text-primary hover:underline duration-300"
        >
          Home
        </Link>
        <ChevronRight className="w-4 h-4 text-light" />
        <span className="">Address</span>
      </div>

      <div className="flex justify-between items-center my-7">
        <h2 className="text-xl font-bold text-dark font-nunito">My Address</h2>
        <button
          onClick={handleAddClick}
          className="flex items-center gap-2 bg-primary text-white text-lg font-semibold px-5 py-2 h-12 rounded-[6px] hover:bg-green-600 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span className="">Add New Address</span>
        </button>
      </div>

      <div className="space-y-6 my-8">
        {isLoading ? (
          Array.from({ length: 2 }).map((_, i) => (
            <div
              key={i}
              className="w-full h-40 bg-gray-100 animate-pulse rounded-lg"
            />
          ))
        ) : addresses.length > 0 ? (
          addresses.map((addr) => (
            <AddressCard
              key={addr.id}
              address={addr}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onSetDefault={handleSetDefault}
              isSettingDefault={settingDefaultId === addr.id}
            />
          ))
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500">No addresses found.</p>
          </div>
        )}
      </div>

      <AddressModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialData={editingAddress}
        isLoading={isAdding || isUpdating}
      />

      <DeleteAddressModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onDelete={confirmDelete}
      />
    </div>
  );
};

export default address;
