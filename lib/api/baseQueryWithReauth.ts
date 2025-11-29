import {
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs, // args
  unknown, // result
  FetchBaseQueryError // error
> = async (args, api, extraOptions) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    prepareHeaders: (headers) => {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("IFETOAccessToken")
          : null;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  });

  let result = await baseQuery(args, api, extraOptions);

  // If token expired (401)
  if (result.error && result.error.status === 401) {
    console.log("Token expired");

    // OPTIONAL: clear token & redirect
    if (typeof window !== "undefined") {
      localStorage.removeItem("IFETOAccessToken");
      window.location.href = "/auth/login";
    }
  }

  return result;
};
