import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Opportunity } from '@/type/jobs';

export const opportunitiesApi = createApi({
  reducerPath: 'opportunitiesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://akil-backend.onrender.com' }),
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
