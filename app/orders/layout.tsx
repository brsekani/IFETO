"use client";
import AuthGuard from "@/components/auth/AuthGuard";
import React from "react";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <AuthGuard>{children}</AuthGuard>;
};

export default layout;
