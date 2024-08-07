import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDatasOrderByLimit, updateDatas } from "../api/firebase";

// let itemCount = 5;

const foodSlice = createSlice({
  name: "food",
  initialState: {
    items: [],
    lq: undefined,
    isLoading: "false",
    loadingError: "",
    order: "createdAt",
    itemCount: 5,
  },
  reducers: {
    setOrder: (state, action) => {
      state.order = action.payload;
    },
    setItemCount: (state, action) => {
      state.itemCount = state.itemCount + action.payload;
    },
    resetItemCount: (state, action) => {
      state.itemCount = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state, action) => {
        state.isLoading = "true";
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.items = action.payload.resultData;
        // state.lq = action.payload.lastQuery;
        state.isLoading = "false";
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.isLoading = "false";
        state.loadingError = action.payload;
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        state.items[index] = action.payload;
        state.isLoading = "false";
      });
  },
});
const fetchItems = createAsyncThunk(
  "items/fetchItems",
  async ({ collectionName, queryOptions }) => {
    // ! dispatch = {type: "", payload:resultData}
    try {
      const resultData = await getDatasOrderByLimit(
        collectionName,
        queryOptions
      );
      return resultData;
    } catch (error) {
      return "FETCH error:", error;
      // console.log("FETCH error:", error);
    }
  }
);

const updateItem = createAsyncThunk(
  "items/updateItem",
  async ({ collectionName, docId, updateObj, imgUrl }) => {
    try {
      const resultData = await updateDatas(
        collectionName,
        docId,
        updateObj,
        imgUrl
      );
      return resultData;
    } catch (error) {
      return "UPDATE error:", error;
      // console.log("UPDATE error:", error);
    }
  }
);

export default foodSlice;
export { fetchItems, updateItem };
export const { setOrder, setItemCount, resetItemCount } = foodSlice.actions;
