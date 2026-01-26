import { TLoginSignup } from "@/types/loginSingup";
import { baseApi } from "./baseApi";
import { TAuthResponse } from "@/types/authResponse";
import { TUser } from "@/types/user";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signupUser: builder.mutation<TAuthResponse, TLoginSignup>({
      query: (userInfo) => {
        return {
          url: "/api/auth/signup",
          method: "POST",
          body: userInfo,
        };
      },
    }),
    loginUser: builder.mutation<
      {
        success: boolean;
        message: string;
        data: { token: string; user: TUser };
      },
      TLoginSignup
    >({
      query: (userInfo) => {
        return {
          url: "/api/auth/signin",
          method: "POST",
          body: userInfo,
        };
      },
    }),
    logoutUser: builder.mutation<{ success: boolean }, null>({
      query: () => {
        return {
          url: "/api/auth/signout",
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
