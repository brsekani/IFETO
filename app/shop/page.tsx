import { Suspense } from "react";
import ShopClient from "./ShopClient";
import Spinner from "@/components/loaders/Spinner";

export default function Page() {
  return (
    <Suspense fallback={<Spinner />}>
      <ShopClient />
    </Suspense>
  );
}
