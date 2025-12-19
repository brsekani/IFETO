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
    getProfile: builder.query<GetProfileResponse, void>({
      query: () => "/profile", // Adjusted endpoint to likely correct path based on auth prefix
      providesTags: ["profile"],
    }),

    updateProfile: builder.mutation<
      UpdateProfileResponse,
      UpdateProfileRequest
    >({
      query: (data) => ({
        url: "/profile",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["profile"],
    }),

    changePassword: builder.mutation<
      ChangePasswordResponse,
      ChangePasswordRequest
    >({
      query: (passwords) => ({
        url: "/profile/password",
        method: "PATCH",
        body: passwords,
      }),
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
  useGetProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useDeleteAccountMutation,
} = profileApi;
