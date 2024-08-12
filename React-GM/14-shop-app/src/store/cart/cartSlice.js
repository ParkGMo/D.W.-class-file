import { createSlice } from "@reduxjs/toolkit";

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
    deleteToCart: (state, action) => {
      const index = state.products.findIndex(
        (product) => product.id === action.payload.id
      );
      if (index !== -1) {
        state.products.filter((product) => product.id !== action.payload.id);
      }
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
        (product) => product.id === action.payload.id
      );
      state.products[index].quantity += 1;
      state.products[index].total =
        state.products[index].total + state.products[index].price;
    },
    decrementProduct: (state, action) => {
      const index = state.products.findIndex(
        (product) => product.id === action.payload.id
      );
      if (index > 1) {
        state.products[index].quantity -= 1;
        state.products[index].total =
          state.products[index].total - state.products[index].price;
      }
    },
  },
});

export default cartSlice.reducer;
export const {
  addToCart,
  deleteToCart,
  getTotalPrice,
  incrementProduct,
  decrementProduct,
} = cartSlice.actions;
