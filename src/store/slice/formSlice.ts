import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "..";

const initialState = {
  title: "",
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
  },
});

export const { setTitle } = formSlice.actions;

export const selectTitle = (state: RootState) => state.form.title;

export default formSlice.reducer;
