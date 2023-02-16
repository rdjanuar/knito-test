import React, { useState } from "react";
import { useAppDispatch } from "./useRedux";
import { setTitle } from "@/store/slice/formSlice";

export const useForm = () => {
  const dispatch = useAppDispatch();
  const [showForm, setShowForm] = useState<boolean>(false);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    dispatch(setTitle(e.currentTarget.value));
  };

  return {
    handleChange,
    showForm,
    setShowForm,
  };
};
