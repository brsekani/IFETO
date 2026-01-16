import { api } from "./api";
import {
  GetAddressesResponse,
  AddAddressRequest,
  AddAddressResponse,
  UpdateAddressRequest,
  UpdateAddressResponse,
  DeleteAddressResponse,
  SetDefaultAddressResponse,
} from "../types";

export const collectionsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCollectionWithProducts: builder.query<any, void>({
      query: () => "/collections/with-products",
      providesTags: ["collections"],
    }),

    addAddresses: builder.mutation<AddAddressResponse, AddAddressRequest>({
      query: (data) => ({
        url: "/addresses",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "addresses", id: "LIST" }],
    }),

    updateAddress: builder.mutation<
      UpdateAddressResponse,
      { id: string; data: UpdateAddressRequest }
    >({
      query: ({ id, data }) => ({
        url: `/addresses/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "addresses", id },
        { type: "addresses", id: "LIST" },
      ],
    }),

    deleteAddress: builder.mutation<DeleteAddressResponse, string>({
      query: (id) => ({
        url: `/addresses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "addresses", id },
        { type: "addresses", id: "LIST" },
      ],
    }),

    changeDefaultAddresses: builder.mutation<SetDefaultAddressResponse, string>(
      {
        query: (id) => ({
          url: `/addresses/${id}/default`,
          method: "PATCH",
        }),
        invalidatesTags: [{ type: "addresses", id: "LIST" }],
      }
    ),
  }),
  overrideExisting: false,
});

export const { useGetCollectionWithProductsQuery } = collectionsApi;
