"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnnouncementBar from "./AnnouncementBar";
import Nav from "./Nav";

export default function LayoutControls({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname() ?? "";

  // Adjust these rules to match your auth routes exactly:
  const isAuthRoute =
    pathname === "/auth" ||
    pathname.startsWith("/auth/") ||
    pathname === "/login" || // if you use /login at root
    pathname.startsWith("/auth-") || // examples — add patterns you use
    pathname.startsWith("/reset-pass") ||
    pathname.startsWith("/signup");

  return (
    <>
      {!isAuthRoute && (
        <div className="fixed top-0 left-0 w-full z-50">
          <AnnouncementBar />
          <Header />
          <Nav />
        </div>
      )}

      <div className={`${!isAuthRoute && "md:pt-[172px] pt-[100px]"}`}>
        {children}
      </div>

      {!isAuthRoute && <Footer />}
    </>
  );
}
