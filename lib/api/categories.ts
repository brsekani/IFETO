import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQueryWithReauth";
import { api } from "./api";

console.log(baseQueryWithReauth);

export const apiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query<any, void>({
      query: () => ({
        url: "/categories",
        method: "GET",
      }),
      providesTags: ["categories"],
    }),
  }),
});

export const { useGetAllCategoriesQuery } = apiSlice;
