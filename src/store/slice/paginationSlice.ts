import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "..";

const initialState = {
  currentPage: 1,
};

const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
});

export const { setPage } = paginationSlice.actions;

export const selectCurrentPage = (state: RootState) =>
  state.pagination.currentPage;

export default paginationSlice.reducer;
