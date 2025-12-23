import { api } from "./api";

export const cartApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => "/cart",
      providesTags: ["Cart"],
    }),

    addCartItem: builder.mutation<
      any,
      { productId: string; quantity?: number }
    >({
      query: ({ productId, quantity = 1 }) => ({
        url: "/cart/items",
        method: "POST",
        body: { productId, quantity },
      }),

      invalidatesTags: ["Cart"],

      onQueryStarted({ productId, quantity = 1 }, { dispatch }) {
        dispatch(
          cartApi.util.updateQueryData("getCart", undefined, (draft: any) => {
            const item = draft.data.items.find(
              (i: any) => i.product.id === productId
            );

            if (item) {
              item.quantity += quantity;
            } else {
              draft.data.items.push({
                id: crypto.randomUUID(),
                quantity,
                product: { id: productId },
              });
            }
          })
        );
      },
    }),

    updateCartItem: builder.mutation<
      void,
      { itemId: string; quantity: number }
    >({
      query: ({ itemId, quantity }) => ({
        url: `/cart/items/${itemId}`,
        method: "PATCH",
        body: { quantity },
      }),

      onQueryStarted({ itemId, quantity }, { dispatch }) {
        // 🔥 instant UI update
        dispatch(
          cartApi.util.updateQueryData("getCart", undefined, (draft: any) => {
            const item = draft.data.items.find((i: any) => i.id === itemId);

            if (item) {
              item.quantity = quantity;
            }
          })
        );
      },
    }),

    removeCartItem: builder.mutation({
      query: (itemId) => ({
        url: `/cart/items/${itemId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),

    clearCart: builder.mutation({
      query: () => ({
        url: "/cart",
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),

    syncCart: builder.mutation({
      query: (items) => ({
        url: "/cart/sync",
        method: "POST",
        body: { items },
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddCartItemMutation,
  useUpdateCartItemMutation,
  useRemoveCartItemMutation,
  useClearCartMutation,
  useSyncCartMutation,
} = cartApi;
