import LoginClient from "@/components/auth/LoginClient";
import Spinner from "@/components/loaders/Spinner";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<Spinner />}>
      <LoginClient />
    </Suspense>
  );
}
