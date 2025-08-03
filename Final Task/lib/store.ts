import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { opportunitiesApi } from './service/opportunitiesApi';
import { bookmarkApi } from './service/bookmarkService';

export const store = configureStore({
  reducer: {
    [opportunitiesApi.reducerPath]: opportunitiesApi.reducer,
    [bookmarkApi.reducerPath]: bookmarkApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(opportunitiesApi.middleware, bookmarkApi.middleware),
});
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
