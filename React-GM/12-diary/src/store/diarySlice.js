import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDatas } from "../api/firebaseGM";

const diarySlice = createSlice({
  name: "diary",
  initialState: {
    items: [],
    error: null,
    status: "welcome",
  },
  reducers: {},
  //   비동기는 extraReducers로
  extraReducers: (builder) => {
    //   비동기작업은 actionCreator를 자동으로 만들어주지 못한다.
    builder
      .addCase(fetchItems.pending, (state, action) => {
        state.status = "Loading";
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "complete";
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = "fail";
      });
  },
});

// const fetchItems = createAsyncThunk(type==(action creator, 아무거나), "" );
// dispatch(fetchItems("diary")), {type: "", payload:resultData} == createAsyncThunk("items/fetchAllItems",...)
const fetchItems = createAsyncThunk(
  "items/fetchAllItems",
  async ({ collectionName, queryOptions }) => {
    try {
      const resultData = await getDatas(collectionName, queryOptions);
      return resultData;
    } catch (error) {
      console.log("fetch Error:", error);
    }
  }
);

export default diarySlice;
export { fetchItems };
