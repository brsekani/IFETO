import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQueryWithReauth";
import {
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  LoginRequest,
  LoginResponse,
  ResendVerificationCodeRequest,
  ResendVerificationCodeResponse,
  SignupRequest,
  SignupResponse,
  VerifyEmailRequestByCode,
  VerifyEmailResponseByCode,
} from "../types";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User", "Data"],
  endpoints: (builder) => ({
    signup: builder.mutation<SignupResponse, SignupRequest>({
      query: (credentials) => ({
        url: "/auth/customer/register",
        method: "POST",
        body: credentials,
      }),
    }),

    verifyAuthCode: builder.mutation<
      VerifyEmailResponseByCode,
      VerifyEmailRequestByCode
    >({
      query: (credentials) => ({
        url: "/auth/customer/verify-auth-code",
        method: "POST",
        body: credentials,
      }),
    }),

    resendVerificationCode: builder.mutation<
      ResendVerificationCodeResponse,
      ResendVerificationCodeRequest
    >({
      query: (credentials) => ({
        url: "/auth/customer/resend-verification-code",
        method: "POST",
        body: credentials,
      }),
    }),

    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/customer/login",
        method: "POST",
        body: credentials,
      }),
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/customer/logout", // or keep but unused
        method: "POST",
      }),
    }),

    forgotPassword: builder.mutation<
      ForgotPasswordResponse,
      ForgotPasswordRequest
    >({
      query: (credentials) => ({
        url: "/auth/customer/forgot-password", // or keep but unused
        method: "POST",
        body: credentials,
      }),
    }),

    getProtectedData: builder.query<string[], void>({
      query: () => "/data/protected",
      providesTags: ["Data"],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useGetProtectedDataQuery,
  useSignupMutation,
  useVerifyAuthCodeMutation,
  useResendVerificationCodeMutation,
  useForgotPasswordMutation,
} = apiSlice;
