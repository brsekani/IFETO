"use client";
import { ChevronLeft, SquarePen } from "lucide-react";
import UserIcon from "@/assets/icons/user.svg";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGetProfileQuery } from "@/lib/api/profile";

const profile = () => {
  const router = useRouter();
  const { data: profileData, isLoading, error } = useGetProfileQuery();
  console.log(profileData);
  const user = profileData?.data;

  console.log(profileData);

  if (isLoading) {
    return (
      <div className="w-full h-full lg:shadow-custom2 bg-white lg:rounded-2xl p-6 flex items-center justify-center">
        <p>Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full lg:shadow-custom2 bg-white lg:rounded-2xl p-6 flex items-center justify-center">
        <p className="text-red-500">Error loading profile. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full lg:shadow-custom2 bg-white lg:rounded-2xl p-6">
      <div className="flex items-center gap-2 w-full justify-between">
        <button
          className="lg:hidden flex items-center gap-2 outline-none text-light"
          onClick={() => router.back()}
        >
          <ChevronLeft className="w-4" />
          <span className="font-medium">back</span>
        </button>

        <div className="flex items-center gap-2">
          <Image
            src={UserIcon}
            alt="user icon"
            className="w-6 hidden lg:block"
          />
          <span className="lg:text-2xl text-xl font-semibold ">My Profile</span>
        </div>

        <Link
          href="/account/profile/edit"
          className="font-semibold lg:text-lg lg:text-primary"
        >
          <span className="hidden lg:block">Edit</span>
          <SquarePen className="w-[18px] text-light lg:hidden" />
        </Link>
      </div>

      <div className="mt-6">
        <div className="">
          <h4 className="text-[#787878] text-sm">Name</h4>
          <h2 className="font-semibold mt-2">
            {user?.firstName} {user?.lastName}
          </h2>
        </div>
        <div className="mt-4">
          <h4 className="text-[#787878] text-sm">Email Address</h4>
          <h2 className="font-semibold mt-2">{user?.email}</h2>
        </div>
        <div className="mt-4">
          <h4 className="text-[#787878] text-sm">Phone Number</h4>
          <h2 className="font-semibold mt-2">{user?.phone || "N/A"}</h2>
        </div>
        {/* Country and Address are not in the User type yet, assuming simple display or N/A for now */}
        <div className="mt-4">
          <h4 className="text-[#787878] text-sm">Country</h4>
          <h2 className="font-semibold mt-2">N/A</h2>
        </div>
        <div className="mt-4">
          <h4 className="text-[#787878] text-sm">Address</h4>
          <h2 className="font-semibold mt-2">N/A</h2>
        </div>
      </div>

      <div className="mt-6"></div>
    </div>
  );
};

export default profile;
