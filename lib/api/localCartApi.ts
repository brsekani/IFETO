import { createApi } from "@reduxjs/toolkit/query/react";
import {
  getLocalCart,
  saveLocalCart,
  addToLocalCart,
  updateLocalCartQty,
  removeFromLocalCart,
} from "@/lib/cart/localCart";
import { LocalCartItem } from "@/types/cart";

export const localCartApi = createApi({
  reducerPath: "localCartApi",
  baseQuery: async () => ({ data: null }),
  tagTypes: ["LocalCart"],
  endpoints: (builder) => ({
    getLocalCart: builder.query<LocalCartItem[], void>({
      queryFn: () => ({ data: getLocalCart() }),
      providesTags: ["LocalCart"],
    }),

    addLocalItem: builder.mutation<void, LocalCartItem>({
      queryFn: (item) => {
        addToLocalCart(item);
        return { data: undefined };
      },
      invalidatesTags: ["LocalCart"],
    }),

    updateLocalQty: builder.mutation<
      void,
      { productId: string; quantity: number }
    >({
      queryFn: ({ productId, quantity }) => {
        updateLocalCartQty(productId, quantity);
        return { data: undefined };
      },
      invalidatesTags: ["LocalCart"],
    }),

    removeLocalItem: builder.mutation<void, string>({
      queryFn: (productId) => {
        removeFromLocalCart(productId);
        return { data: undefined };
      },
      invalidatesTags: ["LocalCart"],
    }),
  }),
});

export const {
  useGetLocalCartQuery,
  useAddLocalItemMutation,
  useUpdateLocalQtyMutation,
  useRemoveLocalItemMutation,
} = localCartApi;
