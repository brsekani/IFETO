import { api } from "./api";

type GetProductsParams = {
  page?: number;
  limit?: number;
  categoryId?: string;
  search?: string;
};

export const productsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query<any, GetProductsParams>({
      query: ({ page = 1, limit = 50, categoryId, search }) => {
        const params = new URLSearchParams();

        params.set("page", String(page));
        params.set("limit", String(limit));

        if (categoryId) {
          params.set("categoryId", categoryId);
        }

        if (search) {
          params.set("search", search);
        }

        return {
          url: `/products?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["products"],
    }),

    getProductById: builder.query<any, string>({
      query: (id) => `/products/${id}`,
    }),
  }),
});

export const { useGetAllProductsQuery, useGetProductByIdQuery } = productsApi;
