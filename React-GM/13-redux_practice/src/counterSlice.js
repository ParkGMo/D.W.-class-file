import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: { plus: 0, minus: 50 },
  reducers: {
    up: (state, action) => {
      // action에 들어가는 파라미터는 payload지정되어있다.
      // state.value = state.value + action.step;
      state.plus = state.plus + action.payload;
    },
    down: (state, action) => {
      // action에 들어가는 파라미터는 payload지정되어있다.
      // state.value = state.value + action.step;
      state.minus = state.minus - action.payload;
    },
  },
});

export default counterSlice;
export const { up } = counterSlice.actions;
export const { down } = counterSlice.actions;
