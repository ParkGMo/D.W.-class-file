import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDatasOrderByLimit } from '../api/firebase';

const foodSlice = createSlice({
  name: 'food',
  initialState: {
    items: [],
    lq: undefined,
    isLoading: 'idle',
    loadingError: '',
    order: 'createdAt',
    hasNext: true,
  },
  reducers: {
    setOrder: (state, action) => {
      state.order = action.payload;
    },
    setHasNext: (state, action) => {
      state.hasNext = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state, action) => {
        state.isLoading = 'Loading';
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        if (action.payload.isReset) {
          state.items = action.payload.resultData;
        } else {
          action.payload.resultData.forEach((data) => {
            state.items.push(data);
          });
          // state.items = [...state.items, ...action.payload.resultData];
        }
        // if(!action.payload.lastQuery) {
        //   state.hasNext = false;
        // }else {
        //   state.hasNext = true;
        // }
        // state.hasNext = action.payload.lastQuery ? true : false;
        state.hasNext = !!action.payload.lastQuery;
        state.lq = action.payload.lastQuery;
        state.isLoading = 'complete';
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.isLoading = 'fail';
        state.loadingError = action.payload;
      });
  },
});

const fetchItems = createAsyncThunk(
  'items/fetchItems',
  async ({ collectionName, queryOptions }) => {
    try {
      const resultData = await getDatasOrderByLimit(
        collectionName,
        queryOptions
      );
      resultData.isReset = !queryOptions.lastQuery ? true : false;
      return resultData;
    } catch (error) {
      return 'FETCH Error: ' + error;
      // console.log("FETCH Error: ", error);
    }
  }
);

export default foodSlice;
export { fetchItems };
export const { setOrder, setHasNext } = foodSlice.actions;
