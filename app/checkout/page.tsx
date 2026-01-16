import { Suspense } from "react";
import Page from "./PageWrapper";

export default function PageWrapper() {
  return (
    <Suspense fallback={null}>
      <Page />
    </Suspense>
  );
}
