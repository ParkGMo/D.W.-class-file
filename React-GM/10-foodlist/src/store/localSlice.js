import { createSlice } from "@reduxjs/toolkit";
import { dict } from "../hooks/useTranslate";

const localSlice = createSlice({
  name: "local",
  initialState: {
    language: "ko",
    dict: dict,
  },
  reducers: {
    // Define reducers for local state changes
    lang(state, action) {
      state.language = action.payload.language;
    },
    trans(state, action) {
      state.dict = dict[state.language][action.payload];
    },
  },
});

export default localSlice;
export const { lang, trans } = localSlice.actions;
