import { getCookie } from "@/utils/cookies";
import {
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://ifeto-backend-1.onrender.com/api/v1',
  credentials: "include",
  prepareHeaders: (headers) => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("IFETOAccessToken")
        : null;
    if (token) headers.set("Authorization", `Bearer ${token}`);

    const country = getCookie("country_code");
    console.log(`country: ${country}`);
    if (country) {
      headers.set("X-Country", country);
    }
    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs, // args
  unknown, // result
  FetchBaseQueryError // error
> = async (args, api, extraOptions) => {
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
