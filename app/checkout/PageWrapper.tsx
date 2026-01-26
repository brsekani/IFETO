"use client";

import Image from "next/image";
import Link from "next/link";
import arrowRight from "@/assets/icons/arrow-right1.svg";
import rightIconPrimary from "@/assets/icons/right-icon-primary.svg";
import info from "@/assets/icons/info-circle-primary.svg";
import { useEffect, useState } from "react";
import RightDrawer from "@/components/RightDrawer";
import AddAddress from "@/components/AddAddress";
import SelectAddress from "@/components/SelectAddress";
import { useAppSelector } from "@/components/auth/AuthGuard";
import { selectIsAuthenticated } from "@/lib/authSlice";
import { useGetCartQuery } from "@/lib/api/cart";
import { UICartItem } from "@/types/cart";
import { formatPriceKeepSymbol } from "@/utils/formatPrice";
import CartItemLoader from "@/components/loaders/CartItemLoader";
import { useRouter, useSearchParams } from "next/navigation";
import OrderSummarySkeleton from "@/components/loaders/OrderSummarySkeleton";
import PayButtonSkeleton from "@/components/loaders/PayButtonSkeleton";
import { useGetProfileQuery } from "@/lib/api/profile";
import ContactSkeleton from "@/components/loaders/ContactSkeleton";
import { useGetAddressesQuery } from "@/lib/api/address";
import DeliveryDetailsSkeleton from "@/components/loaders/DeliveryDetailsSkeleton";
import { useCreateCheckoutSessionMutation } from "@/lib/api/checkout";
import { Address } from "@/types/address";

export default function Page() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const [selectedAddressId, setSelectedAddressId] = useState<string>("");
  const [agreed, setAgreed] = useState(false);
  const searchParams = useSearchParams();
  const urlAddressId = searchParams.get("addressId");

  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/auth/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  const [openAddress, setOpenAddress] = useState(false);
  const [openSelectAddress, setOpenSelectAddress] = useState(false);

  const { data, isLoading } = useGetCartQuery(undefined, {
    skip: !isAuthenticated,
  });

  const {
    data: profileData,
    isLoading: profileLoading,
    error,
  } = useGetProfileQuery(undefined, {
    skip: !isAuthenticated,
  });

  const {
    data: addresssData,
    isLoading: addresssLoading,
    error: addresssError,
  } = useGetAddressesQuery(undefined, {
    skip: !isAuthenticated,
  });

  console.log(addresssData);

  const [createCheckoutSession, { isLoading: creatingSession }] =
    useCreateCheckoutSessionMutation();

  const addresses = addresssData?.data ?? [];

  const selectedAddress = selectedAddressId
    ? (addresses.find((a: Address) => a.id === selectedAddressId) ?? null)
    : null;

  const defaultAddress = addresses.find((a: Address) => a.isDefault) ?? null;

  console.log(defaultAddress);

  const effectiveAddress = selectedAddress ?? defaultAddress;

  const cartItems: UICartItem[] = data?.data?.items;
  const subtotalPrice = data?.data?.subtotalPrice;

  const handlePay = async () => {
    if (!data?.data?.id || !effectiveAddress) return;

    try {
      const res = await createCheckoutSession({
        cartId: data.data.id,
        address: {
          label: effectiveAddress.label,
          address1: effectiveAddress.address1,
          address2: effectiveAddress.address2,
          city: effectiveAddress.city,
          state: effectiveAddress.state,
          country: effectiveAddress.country,
          zipCode: effectiveAddress.zipCode,
        },
        saveAddress: false,
      }).unwrap();

      // 🔥 Redirect to Stripe
      console.log(res);
      window.location.href = res.data.url;
    } catch (err) {
      console.error("Failed to create checkout session", err);
    }
  };

  useEffect(() => {
    if (urlAddressId) {
      setSelectedAddressId(urlAddressId);
    }
  }, [urlAddressId]);

  useEffect(() => {
    if (!urlAddressId && defaultAddress?.id) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("addressId", defaultAddress.id);

      router.replace(`?${params.toString()}`, { scroll: false });
    }
  }, [urlAddressId, defaultAddress, router, searchParams]);

  return (
    <div className="bg-[#FAFAFA]">
      <div className="max-w-[1440px] w-full mx-auto px-6 md:px-20 pt-6 pb-20">
        <div className="flex">
          <Link
            href={"/"}
            className="py-2 px-4 text-[16px] leading-6 font-semibold text-[#5A5A5A]"
          >
            Home
          </Link>
          <Image src={arrowRight} alt="arrowRight" />
          <Link
            href={``}
            className="py-2 px-4 text-[16px] leading-6 font-semibold text-[#5A5A5A] text-nowrap truncate"
          >
            My Cart
          </Link>

          <Image src={arrowRight} alt="arrowRight" />
          <div className="py-2 px-4 text-[16px] leading-6 font-semibold text-[#27AE60] text-nowrap truncate">
            Checkout
          </div>
        </div>

        <div className="flex flex-col md:flex-row w-full md:gap-10 gap-6 md:mt-[50px] mt-6">
          <div className="w-full">
            <div className="p-4 md:p-6 bg-[#FAFAFA] rounded-2xl shadow-custom2 md:space-y-4 space-y-2.5 w-full">
              <div className="md:text-[24px] text-[16px] md:leading-8 leading-6 font-semibold text-[#2A2A2A]">
                Product Summary
              </div>

              <div className="w-full h-screen overflow-y-scroll scrollbar scrollbar-thin">
                {isLoading ? (
                  <>
                    <CartItemLoader />
                    <CartItemLoader />
                    <CartItemLoader />
                  </>
                ) : (
                  cartItems.map((cart, i) => (
                    <div
                      className={`flex md:gap-5 gap-3 w-full ${
                        i > 0 && "border-t-[0.6px]"
                      } border-[#CFCFCF] md:p-4 p-2.5`}
                      key={cart.id || i}
                    >
                      <div className="bg-[#EFEEEE] w-fit md:px-[18px] px-[11px] md:py-6 py-3.5 relative rounded-[6px]">
                        <Image
                          src={cart?.product?.images?.[1]}
                          alt={cart?.product?.name || "product"}
                          width={84}
                          height={57}
                          className="md:w-[84px] w-[49px] md:h-[57px] h-[38px] object-contain"
                        />

                        <div className="absolute top-3 right-2 w-4 h-4 bg-[#27AE60] rounded-full flex items-center justify-center text-[12px] font-semibold text-white">
                          {cart?.quantity}
                        </div>
                      </div>

                      <div className="md:space-y-1.5 space-y-1 min-w-0">
                        <p className="md:text-[20px] text-[14px] md:leading-[30px] leading-5 text-[#2A2A2A] font-semibold truncate w-full">
                          {cart?.product?.name}
                        </p>

                        <p className="md:text-[18px] text-[12px] md:leading-7 leading-[18px] text-[#6C6C6C]">
                          Qty: {cart?.quantity}
                        </p>

                        <p className="md:text-[20px] text-[14px] md:leading-[30px] leading-5 text-[#2A2A2A] font-semibold">
                          {formatPriceKeepSymbol(cart?.price)}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="w-full md:space-y-8 space-y-6 ">
            {/* {profileLoading ? (
              <ContactSkeleton />
            ) : (
              <div className="md:p-6 p-4 bg-[#E3FFEF4D] shadow-custom2 md:space-y-4 space-y-2.5 w-full">
                <h5 className="md:text-[24px] text-[16px] md:leading-8 leading-6 font-semibold text-[#2A2A2A]">
                  Contact
                </h5>

                <div className="md:space-y-2 space-y-[5px]">
                  <h6 className="md:text-[20px] text-[14px] leading-[30px] font-medium text-[#2A2A2A]">
                    {profileData?.data?.firstName} {profileData?.data?.lastName}
                  </h6>

                  <p className="md:text-[18px] text-[12px] md:leading-7 leading-[18px] text-[#787878]">
                    {profileData?.data?.email}
                  </p>

                  <p className="md:text-[18px] text-[12px] md:leading-7 leading-[18px] text-[#787878]">
                    +{profileData?.data?.phone}
                  </p>
                </div>
              </div>
            )} */}

            {addresssLoading ? (
              <DeliveryDetailsSkeleton />
            ) : effectiveAddress ? (
              <div className="bg-[#FFFFFF] md:p-6 p-4 shadow-custom2 rounded-2xl md:space-y-4 space-y-2.5">
                <div className="flex items-center justify-between">
                  <h6 className="md:text-[24px] text-[16px] leading-6 font-semibold text-[#2A2A2A] truncate">
                    Delivery Details
                  </h6>

                  <div className="flex md:space-x-2.5 space-x-1.5 max-w-full">
                    <button
                      className="md:px-4 px-2 md:py-2 py-[3px]
      rounded-md bg-primary md:text-[16px] text-[12px]
      md:leading-6 leading-[18px] text-white font-semibold
      cursor-pointer
      max-w-[140px] md:max-w-none
      truncate overflow-hidden whitespace-nowrap"
                      onClick={() => setOpenSelectAddress(true)}
                    >
                      Select Address
                    </button>

                    <button
                      className="md:px-4 px-2 md:py-2 py-[3px]
      rounded-md text-primary md:text-[16px] text-[12px]
      md:leading-6 leading-[18px] font-semibold
      border-[0.6px] border-primary cursor-pointer
      max-w-[140px] md:max-w-none
      truncate overflow-hidden whitespace-nowrap"
                      onClick={() => setOpenAddress(true)}
                    >
                      Add New Address
                    </button>
                  </div>
                </div>

                <div className="md:space-y-2 space-y-[5px] md:text-[18px] text-[12px] md:leading-7 leading-[18px] text-[#787878]">
                  <h5 className="text-[#2A2A2A] md:text-[20px] text-[14px] md:leading-[30px] leading-5 font-medium">
                    {effectiveAddress.label}
                  </h5>
                  <p>
                    {effectiveAddress.address1}
                    {effectiveAddress.address2 &&
                      `, ${effectiveAddress.address2}`}
                  </p>
                  <p>
                    {effectiveAddress.city}, {effectiveAddress.state}
                  </p>

                  <p>{effectiveAddress.country}</p>
                </div>
              </div>
            ) : (
              <div className="p-6 bg-[#FFFFFF] shadow-custom2 space-y-4 w-full">
                <h5 className="text-[24px] leading-8 font-semibold text-[#2A2A2A]">
                  Delivery Details
                </h5>
                <div
                  onClick={() => setOpenAddress(true)}
                  className="flex items-center justify-between py-2.5 px-4 border-[0.6px] border-primary rounded-md text-primary font-semibold leading-7 cursor-pointer"
                >
                  <p>Add Address</p>
                  <Image src={rightIconPrimary} alt="rightIconPrimary" />
                </div>
              </div>
            )}

            {isLoading ? (
              <>
                <OrderSummarySkeleton />
                <PayButtonSkeleton />
              </>
            ) : (
              <>
                <div className="bg-[#E3FFEF4D] p-4 md:space-y-4 space-y-2.5 md:text-[20px] text-[14px] md:leading-[30px] leading-5 text-[#484848] font-medium">
                  <div className="flex justify-between">
                    <p>Sub Total:</p>
                    <p>{formatPriceKeepSymbol(subtotalPrice)}</p>
                  </div>

                  <div className="flex justify-between">
                    <p>Weight:</p>
                    <p>{data?.data?.totalWeight?.toFixed(2)}kg</p>
                  </div>

                  <div className="flex justify-between">
                    <div className="flex items-center gap-2.5">
                      <p>Weight Fee:</p>
                      <Image src={info} alt="info" />
                    </div>
                    <p>{data?.data?.estimatedShippingPrice}</p>
                  </div>

                  <div className="flex justify-between md:text-[24px] text-[16px] md:leading-8 leading-6 text-[#484848] font-bold">
                    <p>Total:</p>
                    <p>{formatPriceKeepSymbol(data?.data?.totalPrice)}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="rememberMe"
                      name="rememberMe"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      className="w-6 h-6 appearance-none border border-light-active rounded focus:ring-0 cursor-pointer checked:bg-primary checked:border-primary custom-checkbox"
                    />

                    <p className="text-[14px] leading-5">
                      I agree to{" "}
                      <span className="text-[#17683A] underline">
                        <Link href={"/policy/privacy"}>
                          IFETO's Terms and Return Policy
                        </Link>
                      </span>
                    </p>
                  </div>
                  <button
                    disabled={
                      isLoading ||
                      creatingSession ||
                      !effectiveAddress ||
                      !data?.data?.items?.length ||
                      !agreed
                    }
                    onClick={handlePay}
                    className={`h-12 w-full rounded-md text-[18px] font-semibold transition disabled:bg-[#C7D3CC]
    ${
      creatingSession || !effectiveAddress
        ? "bg-gray-300 cursor-not-allowed"
        : "bg-primary text-white hover:bg-green-700"
    }`}
                  >
                    {creatingSession
                      ? "Redirecting to payment..."
                      : `Pay ${formatPriceKeepSymbol(data?.data?.totalPrice)}`}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <RightDrawer
        isOpen={openAddress}
        onClose={() => setOpenAddress(false)}
        widthClass="w-full md:w-[640px]"
      >
        <AddAddress onClose={() => setOpenAddress(false)} />
      </RightDrawer>

      <RightDrawer
        isOpen={openSelectAddress}
        onClose={() => setOpenSelectAddress(false)}
        widthClass="w-full md:w-[640px]"
      >
        <SelectAddress
          onClose={() => setOpenSelectAddress(false)}
          activeAddressId={effectiveAddress?.id}
          onSelectAddress={(id) => {
            setSelectedAddressId(id);

            const params = new URLSearchParams(searchParams.toString());
            params.set("addressId", id);

            router.replace(`?${params.toString()}`, { scroll: false });
          }}
        />
      </RightDrawer>
    </div>
  );
}
