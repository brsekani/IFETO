import { api } from "./api";
import {
  ChangePasswordRequest,
  ChangePasswordResponse,
  DeleteAccountRequest,
  DeleteAccountResponse,
  GetProfileResponse,
  UpdateProfileRequest,
  UpdateProfileResponse,
} from "../types";

export const profileApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAddresses: builder.query<any, void>({
      query: () => "/addresses",
      providesTags: ["addresses"],
    }),

    addAddresses: builder.mutation<any, void>({
      query: (data) => ({
        url: "/addresses",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["addresses"],
    }),

    changeDefaultAddresses: builder.mutation<any, string>({
      query: (id) => ({
        url: `/addresses/${id}/default`,
        method: "PATCH",
      }),
      invalidatesTags: ["addresses"],
    }),

    deleteAccount: builder.mutation<
      DeleteAccountResponse,
      DeleteAccountRequest
    >({
      query: (data) => ({
        url: "/profile",
        method: "DELETE",
        body: data,
      }),
      // On success, you might want to log the user out on the client side
    }),
  }),
  overrideExisting: false, // Prevent overwriting if loaded multiple times
});

export const {
  useGetAddressesQuery,
  useAddAddressesMutation,
  useChangeDefaultAddressesMutation,
  useDeleteAccountMutation,
} = profileApi;
