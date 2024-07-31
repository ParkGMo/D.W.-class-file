import { useReducer, useState } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "PLUS":
      return { count: state.count + 1 };
    case "MINUS":
      return { count: state.count - 1 };
    default:
      return state;
  }
}

const initialState = { count: 0 };

function ReducerTest() {
  // const [state, dispatch] = useReducer(reducer함수,  state함수)
  const [state, dispatch] = useReducer(reducer, initialState);
  // const [count, setCount] = useState(0);
  // const handlePlus = () => {
  //   setCount(count + 1);
  // };
  // const handleMinus = () => {
  //   if (count > 0) {
  //     setCount(count - 1);
  //   }
  // };
  return (
    <div>
      {/* <div className="App"> */}
      <p>count : {state.count}</p>
      <button onClick={() => dispatch({ type: "PLUS" })}>plus</button>
      <button onClick={() => dispatch({ type: "MINUS" })}>minus</button>
    </div>
  );
}

export default ReducerTest;
