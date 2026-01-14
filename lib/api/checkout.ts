// lib/api/checkout.ts

import { api } from "./api";

export const checkoutApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createCheckoutSession: builder.mutation<
      { data: { url: string } },
      {
        cartId: string;
        address: {
          label: string;
          address1: string;
          address2?: string;
          city: string;
          state: string;
          country: string;
          zipCode?: string;
        };
        saveAddress: boolean;
      }
    >({
      query: (body) => ({
        url: "/checkout/create-session",
        method: "POST",
        body,
      }),
    }),

    getSessionById: builder.query<any, string>({
      query: (id) => `/checkout/session/${id}`,
    }),
  }),
});

export const { useCreateCheckoutSessionMutation, useGetSessionByIdQuery } =
  checkoutApi;
