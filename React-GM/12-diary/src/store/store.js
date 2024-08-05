import { configureStore } from "@reduxjs/toolkit";
import diarySlice from "./diarySlice";

// reducer(slice) 여러 개 쓴다면 key로 담아야한다.
const store = configureStore({
  reducer: { diary: diarySlice.reducer },
});

export default store;
