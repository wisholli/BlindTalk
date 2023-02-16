import { configureStore } from "@reduxjs/toolkit";
import { feedApi } from "../services/repository";

export const store = configureStore({
  reducer: {
    [feedApi.reducerPath]: feedApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(feedApi.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
