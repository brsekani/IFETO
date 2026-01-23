import { api } from "./api";

export const collectionsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCollectionWithProducts: builder.query<any, void>({
      query: () => "/collections/with-products",
      providesTags: ["collections"],
    }),

    getCollectionWithProductsBySlug: builder.query<any, string>({
      query: (slug) => `/collections/${slug}`,
      providesTags: ["collections"],
    }),
  }),
});

export const {
  useGetCollectionWithProductsQuery,
  useGetCollectionWithProductsBySlugQuery,
} = collectionsApi;
