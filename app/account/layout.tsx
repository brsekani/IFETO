"use client";
import DesktopAccountNav from "@/components/general/DesktopAccountNav";
import AuthGuard from "@/components/auth/AuthGuard";
import React from "react";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="bg-[#FAFAFA] ">
      <div className="max-w-7xl mx-auto flex gap-6 lg:py-7 lg:px-20">
        <div className="hidden lg:block">
          <DesktopAccountNav />
        </div>
        <div className="w-full">
          <AuthGuard>{children}</AuthGuard>
        </div>
      </div>
    </div>
  );
};

export default layout;
