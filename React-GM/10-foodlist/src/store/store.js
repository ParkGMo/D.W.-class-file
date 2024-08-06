import { configureStore } from "@reduxjs/toolkit";
import localSlice from "./localSlice";
import sortSlice from "./sortSlice";

const store = configureStore({
  reducer: {
    local: localSlice.reducer,
    sort: sortSlice.reducer,
  },
});

export default store;
