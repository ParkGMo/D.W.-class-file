import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addCart,
  createOrder,
  deleteDatas,
  syncCart,
  updateTotalAndQuantity,
} from "../../api/firebaseGM";

const initialState = {
  products: localStorage.getItem("cartProducts")
    ? JSON.parse(localStorage.getItem("cartProducts"))
    : [],
  totalPrice: 0,
  userId: "",
};

export const postOrder = createAsyncThunk(
  "cart/createOrder",
  async ({ uid, cart }, thunkAPI) => {
    try {
      // createOrder 함수 호출
      const result = await createOrder(uid, cart);
      if (!result) {
        return;
      }
      // cartSlice의 products 초기화 및 로컬스토리지 초기화
      thunkAPI.dispatch(sendOrder());
    } catch (error) {
      console.error(error);
    }
  }
);

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
    syncCartAndSlice: (state, action) => {
      state.products = action.payload;
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
      localStorage.setItem("cartProducts", JSON.stringify(state.products));
    },
    decrementProduct: (state, action) => {
      const index = state.products.findIndex(
        (product) => product.id === action.payload
      );
      state.products[index].quantity -= 1;
      state.products[index].total -= state.products[index].price;
      localStorage.setItem("cartProducts", JSON.stringify(state.products));
    },
    sendOrder: (state) => {
      state.products = [];
      localStorage.setItem("cartProducts", JSON.stringify(state.products));
    },
  },
});

export const syncCartAndStorage = createAsyncThunk(
  "cart/asyncCartItem",
  async ({ uid, cartItems }, thunkAPI) => {
    try {
      const result = await syncCart(uid, cartItems);
      thunkAPI.dispatch(syncCartAndSlice(result));
    } catch (error) {
      console.error(error);
    }
  }
);

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

export const calculateTotalAndQuantity = createAsyncThunk(
  "cart/cartItemCalculate",
  async ({ uid, productId, operator }, thunkAPI) => {
    try {
      await updateTotalAndQuantity(uid, productId, operator);
      if (operator == "increment") {
        thunkAPI.dispatch(incrementProduct(productId));
      } else {
        thunkAPI.dispatch(decrementProduct(productId));
      }
    } catch (error) {
      console.error(error);
    }
  }
);

export default cartSlice.reducer;
export const {
  addToCart,
  deleteFromCart,
  getTotalPrice,
  syncCartAndSlice,
  incrementProduct,
  decrementProduct,
  sendOrder,
} = cartSlice.actions;
