import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Opportunity } from '@/type/jobs';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const opportunitiesApi = createApi({
  reducerPath: 'opportunitiesApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getOpportunities: builder.query<Opportunity[], void>({
      query: () => 'opportunities/search',
    }),
    getOpportunityById: builder.query<Opportunity, string>({
      query: (id) => `/opportunities/${id}`,
    }),
  }),
});

export const { useGetOpportunitiesQuery, useGetOpportunityByIdQuery } = opportunitiesApi;
