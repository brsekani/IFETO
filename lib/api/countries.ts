import { api } from "./api"; // 👈 base API (IMPORTANT)

export const countriesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMyCountry: builder.query<any, void>({
      query: () => "/countries/my-country",
      providesTags: ["countries"],
    }),
  }),
});

export const { useGetMyCountryQuery } = countriesApi;
