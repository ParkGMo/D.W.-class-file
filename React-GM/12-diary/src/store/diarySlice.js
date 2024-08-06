import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addDatas,
  deleteDatas,
  getDatas,
  updateDatas,
} from "../api/firebaseGM";

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
      })
      .addCase(addItem.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.status = "complete";
      })
      .addCase(updateItems.fulfilled, (state, action) => {
        // state.items = state.items.map((item) =>
        //   item.id === action.payload.id ? action.payload : item
        // );
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        state.items[index] = action.payload;
        state.status = "complete";
      })
      .addCase(deleteItems.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item.docId !== action.payload
        );
        state.status = "complete";
      });
  },
});

// const fetchItems = createAsyncThunk(type==(action creator, 아무거나), "" );
// dispatch(fetchItems("diary")), {type: "", payload:resultData} == createAsyncThunk("items/fetchAllItems",...)
const fetchItems = createAsyncThunk(
  "items/fetchAllItems", // ---> type
  async ({ collectionName, queryOptions }) => {
    try {
      const resultData = await getDatas(collectionName, queryOptions);
      return resultData; // --> payload
    } catch (error) {
      console.log("FETCH Error:", error);
    }
  }
);
// addItem == action creator
// resultDatas == payload creator
const addItem = createAsyncThunk(
  "items/addItem", // ---> type
  async ({ collectionName, addObj }) => {
    try {
      const resultData = await addDatas(collectionName, addObj);
      return resultData; // --> payload
    } catch (error) {
      console.log("ADD Error:", error);
    }
  }
);

const updateItems = createAsyncThunk(
  "items/updateItems", // ---> type
  async ({ collectionName, docId, updateObj }) => {
    try {
      const resultData = await updateDatas(collectionName, docId, updateObj);
      return resultData; // --> payload
    } catch (error) {
      console.log("UPDATE Error:", error);
    }
  }
);

const deleteItems = createAsyncThunk(
  "items/deleteItems", // ---> type
  async ({ collectionName, docId }) => {
    try {
      const resultData = await deleteDatas(collectionName, docId);
      return docId; // --> payload
    } catch (error) {
      console.log("DELETE Error:", error);
    }
  }
);

export default diarySlice;
export { fetchItems, addItem, updateItems, deleteItems };
