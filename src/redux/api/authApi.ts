import { TLoginSignup } from "@/types/loginSingup";
import { baseApi } from "./baseApi";
import { TAuthResponse } from "@/types/authResponse";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signupUser: builder.mutation<TAuthResponse, TLoginSignup>({
      query: (userInfo) => {
        return {
          url: "/api/auth/sign-up/email",
          method: "POST",
          body: userInfo,
        };
      },
    }),
    loginUser: builder.mutation<TAuthResponse, TLoginSignup>({
      query: (userInfo) => {
        return {
          url: "/api/auth/sign-in/email",
          method: "POST",
          body: userInfo,
        };
      },
    }),
    logoutUser: builder.mutation<{ success: boolean }, null>({
      query: () => {
        return {
          url: "/api/auth/sign-out",
          method: "POST",
        };
      },
    }),
  }),
});

export const {
  useSignupUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
} = authApi;
