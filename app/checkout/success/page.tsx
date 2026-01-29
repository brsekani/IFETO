export const dynamic = "force-dynamic";

import { Suspense } from "react";
import SuccessPage from "./SuccessPage";
import Spinner from "@/components/loaders/Spinner";

export default function Page() {
  return (
    <Suspense fallback={<Spinner />}>
      <SuccessPage />
    </Suspense>
  );
}
