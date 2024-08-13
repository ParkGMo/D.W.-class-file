import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addCart, deleteDatas } from "../../api/firebaseGM";

const initialState = {
  products: localStorage.getItem("cartProducts")
    ? JSON.parse(localStorage.getItem("cartProducts"))
    : [],
  totalPrice: 0,
  userId: "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.products.push({
        ...action.payload,
        quantity: 1,
        total: action.payload.price,
      });
      localStorage.setItem("cartProducts", JSON.stringify(state.products));
    },
    deleteFromCart: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
      localStorage.setItem("cartProducts", JSON.stringify(state.products));
    },
    getTotalPrice: (state, action) => {
      state.totalPrice = state.products.reduce(
        (acc, product) => (acc += product.total),
        0
      );
    },
    incrementProduct: (state, action) => {
      const index = state.products.findIndex(
        (product) => product.id === action.payload
      );
      state.products[index].quantity += 1;
      state.products[index].total =
        state.products[index].total + state.products[index].price;
    },
    decrementProduct: (state, action) => {
      const index = state.products.findIndex(
        (product) => product.id === action.payload
      );
      if (index > 1) {
        state.products[index].quantity -= 1;
        state.products[index].total -= state.products[index].price;
      }
    },
  },
});

export const addToCartItem = createAsyncThunk(
  "cart/addToCart",
  async ({ collectionName, product }, thunkAPI) => {
    try {
      await thunkAPI.dispatch(addToCart(product));
      const {
        cartSlice: { products },
      } = thunkAPI.getState();
      const addItem = products.find(
        (sliceProduct) => sliceProduct.id === product.id
      );
      await addCart(collectionName, addItem);
    } catch (error) {}
  }
);

export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async ({ collectionName, productId }, thunkAPI) => {
    try {
      const resultData = await deleteDatas(collectionName, productId);
      if (resultData) {
        thunkAPI.dispatch(deleteFromCart(productId));
        // thunkAPI.dispatch로 인해 extraReducers를 해줄 필요가 없다. fulfilled일 때 payload로 들어간다
      }
    } catch (error) {
      // reject일 때의 문제는 thunkAPI.rejectWithValue로 해결!
      return thunkAPI.rejectWithValue("Error Delete CartItem");
    }
  }
);

export default cartSlice.reducer;
export const {
  addToCart,
  deleteFromCart,
  getTotalPrice,
  incrementProduct,
  decrementProduct,
} = cartSlice.actions;
