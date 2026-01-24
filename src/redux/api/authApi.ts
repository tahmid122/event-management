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
  }),
});

export const { useSignupUserMutation } = authApi;
