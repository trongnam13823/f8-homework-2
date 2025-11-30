import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api01.f8team.dev/api",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (credentials) => {
        const [firstName, ...lastNameParts] = credentials.fullName.trim().split(" ");
        return {
          url: "/auth/register",
          method: "POST",
          body: {
            firstName: firstName || "User",
            lastName: lastNameParts.join(" ") || "Name",
            email: credentials.email,
            password: credentials.password,
            password_confirmation: credentials.confirmPassword,
          },
        };
      },
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    getCurrentUser: builder.query({
      query: () => "/auth/me",
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useGetCurrentUserQuery } = authApi;
export default authApi;
