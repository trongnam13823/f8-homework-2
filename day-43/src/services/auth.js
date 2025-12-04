import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "./createBaseQuery";

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: createBaseQuery("/auth"),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (credentials) => {
        const [firstName, ...lastNameParts] = credentials.fullName.trim().split(" ");
        return {
          url: "/register",
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
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),
    getCurrentUser: builder.query({
      query: () => "/me",
    }),
    getDevices: builder.query({
      query: () => "/devices",
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useGetCurrentUserQuery, useGetDevicesQuery } = authApi;
export default authApi;
