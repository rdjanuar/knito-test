import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";

import paginationReducer from "./slice/paginationSlice";
import formReducer from "./slice/formSlice";
import { todosApi } from "./api";

export const store = () =>
  configureStore({
    reducer: {
      [todosApi.reducerPath]: todosApi.reducer,
      pagination: paginationReducer,
      form: formReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(todosApi.middleware),
  });

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const wrapper = createWrapper<AppStore>(store, {
  debug: true,
});
