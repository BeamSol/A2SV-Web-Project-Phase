// import axios from "axios";

// const API_URL = process.env.NEXT_PUBLIC_API_URL;

// export const bookmarkService = {
//   getBookmarks: async (token: string) => {
//     const response = await axios.get(`${API_URL}/bookmarks`, {
//       headers: {
//         "Content-Type": "application/json",
//         "Accept": "application/json",
//         "Authorization": `Bearer ${token}`,
//       },
//     });
//     return response.data;
//   },
//   addBookmark: async (jobId: string, token: string) => {
//     const response = await axios.post(`${API_URL}/bookmarks`, { jobId }, {
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${token}`,
//       },
//     });
//     return response.data;
//   },

//   removeBookmark: async (jobId: string, token: string) => {
//     const response = await axios.delete(`${API_URL}/bookmarks/${jobId}`, {
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${token}`,
//       },
//     });
//     return response.data;
//   },
// };

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface Bookmark {
  id: string;
  jobId: string;
}

export const bookmarkApi = createApi({
  reducerPath: 'bookmarkApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    // prepareHeaders: (headers, { getState }: any) => {
    //   const token = getState().auth?.token || localStorage.getItem('token');
    //   if (token) {
    //     headers.set('Authorization', `Bearer ${token}`);
    //   }
    //   headers.set('Content-Type', 'application/json');
    //   headers.set('Accept', 'application/json');
    //   return headers;
    // },
  }),
  tagTypes: ['Bookmarks'],
  endpoints: (builder) => ({
    // getBookmarks: builder.query<Bookmark[], void>({
    //   query: () => `/bookmarks`,
    //   providesTags: ['Bookmarks'],
    // }),
    getBookmarks: builder.query<Bookmark[], string>({
      query: (token) => ({
        url: `/bookmarks`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }),
      providesTags: ['Bookmarks'],
    }),

    addBookmark: builder.mutation<any, { jobId: string, token: string }>({
      query: ({ jobId, token }) => ({
        url: `/bookmarks/${jobId}`,
        method: 'POST',
        body: { jobId },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['Bookmarks'],
    }),
    removeBookmark: builder.mutation<any, { jobId: string, token: string }>({
      query: ({ jobId, token }) => ({
        url: `/bookmarks/${jobId}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['Bookmarks'],
    }),
  }),
});

export const {
  useGetBookmarksQuery,
  useAddBookmarkMutation,
  useRemoveBookmarkMutation,
} = bookmarkApi;
