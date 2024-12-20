import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDatas } from "../../api/firebaseGM";

const initialState = {
  order: [],
  isLoading: false,
  error: "",
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase("fetchOrder.pending", (state, action) => {
        state.isLoading = true;
      })
      .addCase("fetchOrder.fulfilled", (state, action) => {
        state.isLoading = false;
        state.order = action.payload;
      })
      .addCase("fetchOrder.rejected", (state, action) => {
        state.isLoading = false;
        //   action.payload == thunkAPI.rejectWithValue(error
        state.error = action.payload;
      });
  },
});

export const fetchOrder = createAsyncThunk(
  "order/fetchOrder",
  async ({ collectionName, queryOptions }, thunkAPI) => {
    try {
      const resultData = await getDatas(collectionName, queryOptions);
      return resultData;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export default orderSlice.reducer;
