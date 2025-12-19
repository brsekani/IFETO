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
} from "../../app/features/auth/auth.types";
import { api } from "./api";

export const authApi = api.injectEndpoints({
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
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useSignupMutation,
  useVerifyAuthCodeMutation,
  useResendVerificationCodeMutation,
  useForgotPasswordMutation,
} = authApi;
