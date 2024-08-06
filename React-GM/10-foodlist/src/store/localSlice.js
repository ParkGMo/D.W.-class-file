import { createSlice } from "@reduxjs/toolkit";

const localSlice = createSlice({
  name: "local",
  initialState: {
    language: "ko",
  },
  reducers: {
    // Define reducers for local state changes
    lang(state, action) {
      state.language = action.payload.language;
    },
  },
});

export default localSlice;
export const { lang } = localSlice.actions;
// export const { koLang, enLang } = localSlice.actions;
