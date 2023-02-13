import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ITodos } from "@/utils";
import { HYDRATE } from "next-redux-wrapper";

export const todosApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: ["todoApi"],
  endpoints: (builder) => ({
    getTodos: builder.query<Array<ITodos>, number>({
      query: (page) => `/todos?_page=${page}&_limit=5`,
      providesTags: ["todoApi"],
    }),
    deleteTodos: builder.mutation<Array<ITodos>, number>({
      query: (id) => ({
        url: `/todos/${id}`,
        method: "DELETE",
        body: id,
      }),
    }),
    addTodos: builder.mutation<Array<ITodos>, object>({
      query: (data) => ({
        url: "/todos",
        method: "POST",
        body: data,
      }),
    }),
    updateTodos: builder.mutation<Array<ITodos>, ITodos>({
      query: ({ id, ...data }) => ({
        url: `/todos/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodosMutation,
  useUpdateTodosMutation,
  useDeleteTodosMutation,
  util: { getRunningQueriesThunk },
} = todosApi;

export const { getTodos } = todosApi.endpoints;
