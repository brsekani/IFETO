"use client";


import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

import { selectIsAuthenticated } from "@/lib/authSlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // Check localStorage directly for immediate feedback before Redux potentially hydrates
    // functionality here mirrors logic in baseQueryWithReauth regarding token existence
    const token = typeof window !== "undefined" ? localStorage.getItem("IFETOAccessToken") : null;

    if (!isAuthenticated && !token) {
      router.push("/auth/login");
    } else {
      setChecked(true);
    }
  }, [isAuthenticated, router]);

  if (!checked) {
    // You can replace this with a proper loading spinner component
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthGuard;
