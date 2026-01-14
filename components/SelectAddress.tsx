import React from "react";
import Image from "next/image";
import { Formik, Form } from "formik";
import close from "@/assets/icons/Close.svg";
import {
  useChangeDefaultAddressesMutation,
  useGetAddressesQuery,
} from "@/lib/api/address";
import { selectIsAuthenticated } from "@/lib/authSlice";
import { useAppSelector } from "./auth/AuthGuard";
import { showErrorToast, showSuccessToast } from "@/app/utils/toastHelpers";
import { Address } from "@/types/address";

type Props = {
  onClose: () => void;
  onSelectAddress: (addressId: string) => void;
};

export default function SelectAddressList({ onClose, onSelectAddress }: Props) {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const {
    data: addresssData,
    isLoading: addresssLoading,
    error: addresssError,
  } = useGetAddressesQuery(undefined, {
    skip: !isAuthenticated,
  });

  const [changeDefaultAddress, { isLoading: changingDefault }] =
    useChangeDefaultAddressesMutation();

  const addresses = addresssData?.data ?? [];

  const defaultAddressId =
    addresses.find((a: Address) => a.isDefault)?.id || "";

  return (
    <Formik
      enableReinitialize
      initialValues={{
        selectedAddressId: defaultAddressId,
      }}
      onSubmit={async ({ selectedAddressId }) => {
        if (!selectedAddressId) return;

        onSelectAddress(selectedAddressId); // 👈 send ID to parent
        onClose();
      }}
    >
      {({ values, setFieldValue }) => {
        const isUnchanged = values.selectedAddressId === defaultAddressId;

        return (
          <Form className="bg-white h-full flex flex-col px-6 py-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[22px] font-semibold text-[#2A2A2A]">
                Select Address
              </h2>
              <Image
                src={close}
                alt="close"
                onClick={onClose}
                className="cursor-pointer"
              />
            </div>

            {/* Address List */}
            <div className="space-y-6 flex-1 overflow-y-auto">
              {addresses?.map((item: Address) => (
                <label
                  key={item.id}
                  className={`flex items-start gap-4 rounded-lg cursor-pointer transition w-full`}
                >
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={values.selectedAddressId === item.id}
                      onChange={() =>
                        setFieldValue("selectedAddressId", item.id)
                      }
                      className="peer appearance-none md:w-6 md:h-6  h-4 w-4 rounded-full border border-gray-400
               checked:border-[#27AE60]"
                    />

                    {/* White Dot */}
                    <span
                      className="pointer-events-none absolute left-1/2 top-1/2 
               -translate-x-1/2 -translate-y-1/2
               w-[9.6px] h-[9.6px] rounded-full peer-checked:bg-[#27AE60]
               peer-checked:opacity-100"
                    ></span>
                  </label>

                  {/* Content */}
                  <div className="md:space-y-2 space-y-[5px] md:text-[18px] text-[12px] md:leading-7 leading-[18px] text-[#787878] md:p-6 p-4 bg-[#EFEEEE] w-full rounded-2xl">
                    <p className="">{item.address1}</p>
                    <p className="">{item.address2}</p>
                    <p>{item.label}</p>
                    <p>{item.state}</p>
                    <p>{item.city}</p>
                    <p>{item.country}</p>
                  </div>
                </label>
              ))}
            </div>

            {/* Actions */}
            <button
              type="submit"
              disabled={isUnchanged || changingDefault}
              className="mt-8 h-[52px] w-full rounded-md
                bg-[#2DB463] text-white text-[18px] font-semibold
                disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {changingDefault ? "Saving..." : "Confirm Address"}
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}
