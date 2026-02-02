import { Suspense } from "react";
import Page from "./PageWrapper";
import Spinner from "@/components/loaders/Spinner";

export default function PageWrapper() {
  return (
    <Suspense fallback={<Spinner />}>
      <Page />
    </Suspense>
  );
}
