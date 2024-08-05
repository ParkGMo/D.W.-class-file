import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./counterSlice";

//*  reducer는 필수 이다.
export const store = configureStore({
  reducer: counterSlice.reducer,
});
