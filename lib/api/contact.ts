import { apiSlice } from "./auth";

export interface ContactMessageRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

export interface ContactMessageResponse {
  message: string;
  success: boolean;
}

export const contactApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendContactMessage: builder.mutation<
      ContactMessageResponse,
      ContactMessageRequest
    >({
      query: (data) => ({
        url: "/support",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useSendContactMessageMutation } = contactApi;
