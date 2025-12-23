import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import { api } from "./api/api";
import { localCartApi } from "@/lib/api/localCartApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,

    // 🔥 Server cart (logged-in)
    [api.reducerPath]: api.reducer,

    // 🔥 Local cart (guest)
    [localCartApi.reducerPath]: localCartApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      api.middleware,
      localCartApi.middleware // 🔑 REQUIRED
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
