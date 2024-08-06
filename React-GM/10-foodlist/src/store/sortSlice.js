import { createSlice } from "@reduxjs/toolkit";

const sortSlice = createSlice({
  name: "sort",
  initialState: {
    // sortOrder: "createdAt",
    sortOrder: "calorie",
    sortCount: 5,
  },
  reducers: {
    sortOrder: (state, action) => {
      state.sortOrder = action.payload;
    },
    sortCount: (state, action) => {
      state.sortCount = state.sortCount + action.payload;
    },
  },
});

export default sortSlice;
export const { sortCount, sortOrder } = sortSlice.actions;
