import React, { useReducer } from "react";
// import './App.css';

function reducer(state, action) {
  if (action.type === "up") {
    return { ...state, value: state.value + action.step };
  }
  return state;
}

const initialState = { value: 0 };

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div>
      <button>+</button>
      {state.value}
      {/* {count} */}
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Counter />
    </div>
  );
}

export default App;
