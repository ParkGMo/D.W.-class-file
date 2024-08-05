import { createSlice } from "@reduxjs/toolkit";

const diarySlice = createSlice({
  name: "diary",
  initialState: {
    items: [],
    error: null,
    status: "welcome",
  },
});
