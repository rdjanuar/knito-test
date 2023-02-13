import React from "react";

import { todosApi } from "@/store/api";
import {
  useAddTodosMutation,
  useDeleteTodosMutation,
  useUpdateTodosMutation,
} from "@/store/api";
import type { ITodos } from "@/utils";
import { useAppDispatch, useAppSelector } from "./useRedux";
import { setTitle } from "@/store/slice/formSlice";

export const useMutations = () => {
  const [addTodo] = useAddTodosMutation();
  const [updateTodo] = useUpdateTodosMutation();
  const [deleteTodo] = useDeleteTodosMutation();
  const dispatch = useAppDispatch();
  const title = useAppSelector((state) => state.form.title);
  const currentPage = useAppSelector((state) => state.pagination.currentPage);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>): void => {
    addTodo({
      userId: 1,
      id: Math.random() * 1000,
      title: title,
      completed: false,
    });
    dispatch(setTitle(""));

    dispatch(
      todosApi.util.updateQueryData("getTodos", currentPage, (old) => {
        old.unshift({
          userId: 1,
          title,
          id: Math.random() * 1000,
          completed: false,
        });
      }) as any
    );
  };

  const handleUpdate = (
    e: React.ChangeEvent<HTMLInputElement>,
    datum: ITodos
  ) => {
    e.preventDefault();
    updateTodo({
      ...datum,
      completed: !datum.completed,
    });

    dispatch(
      todosApi.util.updateQueryData("getTodos", currentPage, (old) => {
        return old.map((el) =>
          el.id === datum.id ? { ...el, completed: !el.completed } : el
        );
      }) as any
    );
  };

  const handleDelete = (id: number) => {
    deleteTodo(id);

    dispatch(
      todosApi.util.updateQueryData("getTodos", currentPage, (old) => {
        return old.filter((el) => el.id !== id);
      }) as any
    );
  };

  return {
    handleSubmit,
    handleDelete,
    handleUpdate,
  };
};
