import React, { useReducer } from "react";
// import './App.css';
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Provider, useDispatch, useSelector } from "react-redux";
import counterSlice, { down, up } from "./counterSlice";
import { store } from "./store";

// function reducer(state, action) {
//   if (action.type === "up") {
//     return { ...state, value: state.value + action.step };
//   }
//   return state;
// }

// const initialState = { value: 0 };

function Counter() {
  // const [state, dispatch] = useReducer(reducer, initialState);
  const dispatch = useDispatch();
  const plus = useSelector((state) => {
    return state.plus;
  });
  const minus = useSelector((state) => {
    return state.minus;
  });
  return (
    <>
      <div>
        <button
          onClick={() => {
            // actions는 slice의 reducer이다.
            // dispatch({ type: "up", step: 2 })
            // dispatch({ type: "counter/up", step: 2 })
            // dispatch(counterSlice.actions.up(2))
            dispatch(up(2));
          }}
        >
          +
        </button>
        {/* {state.value} */}
        {plus}
      </div>
      <div>
        <button
          onClick={() => {
            // actions는 slice의 reducer이다.
            // dispatch({ type: "up", step: 2 })
            // dispatch({ type: "counter/up", step: 2 })
            // dispatch(counterSlice.actions.up(2))
            dispatch(down(2));
          }}
        >
          -
        </button>
        {/* {state.value} */}
        {minus}
      </div>
    </>
  );
}

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Counter />
      </div>
    </Provider>
  );
}

export default App;
