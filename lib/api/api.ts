// lib/api/api.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQueryWithReauth";

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "countries",
    "user",
    "categories",
    "profile",
    "products",
    "Cart",
    "Orders",
    "addresses",
    "collections",
    "RoutineOrders",
  ],
  endpoints: () => ({}),
});
