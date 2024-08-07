import { configureStore } from "@reduxjs/toolkit";
import localSlice from "./localSlice";
import sortSlice from "./sortSlice";
import foodSlice from "./foodSlice";

const store = configureStore({
  reducer: {
    local: localSlice.reducer,
    // sort: sortSlice.reducer,
    food: foodSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
