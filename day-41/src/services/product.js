import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseQuery";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery,
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (page = 1) => `/products?page=${page}`,
    }),
    createProduct: builder.mutation({
      query: (body) => ({
        url: "/products",
        method: "POST",
        body,
      }),
    }),
    updateProduct: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useGetProductsQuery, useCreateProductMutation, useUpdateProductMutation, useDeleteProductMutation } =
  productApi;
