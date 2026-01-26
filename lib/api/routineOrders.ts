import { api } from "./api";

export const routineOrdersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createRoutineOrder: builder.mutation<
      any,
      {
        orderId: string;
        frequency: string;
        customIntervalDays: number;
        items: { productId: string; quantity: number }[];
      }
    >({
      query: ({ orderId, ...body }) => ({
        url: `/routine-orders/convert/${orderId}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Orders", "RoutineOrders"],
    }),

    recalculateRoutineOrder: builder.mutation<
      any,
      {
        items: { productId: string; quantity: number }[];
      }
    >({
      query: (body) => ({
        url: `/routine-orders/recalculate`,
        method: "POST",
        body,
      }),
    }),

    getRoutineOrders: builder.query<any, void>({
      query: () => "/routine-orders",
      providesTags: ["RoutineOrders"],
    }),

    getRoutineOrderById: builder.query<any, string>({
      query: (id) => `/routine-orders/${id}`,
      providesTags: (result, error, id) => [{ type: "RoutineOrders", id }],
    }),

    updateRoutineOrder: builder.mutation<any, { id: string; body: any }>({
      query: ({ id, body }) => ({
        url: `/routine-orders/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        "RoutineOrders",
        { type: "RoutineOrders", id },
      ],
    }),

    pauseRoutineOrder: builder.mutation<any, string>({
      query: (id) => ({
        url: `/routine-orders/${id}/pause`,
        method: "POST",
      }),
      invalidatesTags: (result, error, id) => [
        "RoutineOrders",
        { type: "RoutineOrders", id },
      ],
    }),

    resumeRoutineOrder: builder.mutation<any, string>({
      query: (id) => ({
        url: `/routine-orders/${id}/resume`,
        method: "POST",
      }),
      invalidatesTags: (result, error, id) => [
        "RoutineOrders",
        { type: "RoutineOrders", id },
      ],
    }),

    cancelRoutineOrder: builder.mutation<any, string>({
      query: (id) => ({
        url: `/routine-orders/${id}/cancel`,
        method: "POST",
      }),
      invalidatesTags: (result, error, id) => [
        "RoutineOrders",
        { type: "RoutineOrders", id },
      ],
    }),

    deleteRoutineOrder: builder.mutation<any, string>({
      query: (id) => ({
        url: `/routine-orders/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        "RoutineOrders",
        { type: "RoutineOrders", id },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateRoutineOrderMutation,
  useRecalculateRoutineOrderMutation,
  useGetRoutineOrdersQuery,
  useGetRoutineOrderByIdQuery,
  useUpdateRoutineOrderMutation,
  usePauseRoutineOrderMutation,
  useResumeRoutineOrderMutation,
  useCancelRoutineOrderMutation,
  useDeleteRoutineOrderMutation,
} = routineOrdersApi;
