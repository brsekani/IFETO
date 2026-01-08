import { api } from "./api";
import { GetOrdersResponse, GetOrderByIdResponse } from "../types";

export const ordersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query<GetOrdersResponse, void>({
      query: () => "/orders",
      providesTags: (result) =>
        result
          ? [
              ...result.data.data.map(({ id }) => ({ type: "Orders" as const, id })),
              { type: "Orders", id: "LIST" },
            ]
          : [{ type: "Orders", id: "LIST" }],
    }),

    getOrderById: builder.query<GetOrderByIdResponse, string>({
      query: (id) => `/orders/${id}`,
      providesTags: (result, error, id) => [{ type: "Orders", id }],
    }),
  }),
  overrideExisting: false,
});

export const { useGetOrdersQuery, useGetOrderByIdQuery } = ordersApi;
