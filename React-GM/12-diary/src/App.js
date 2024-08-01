import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import NewPage from "./pages/NewPage";
import { createContext, useEffect, useReducer } from "react";
import { addItems, fetchItems, initialState, reducer } from "./api/itemReducer";

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  // CREATE
  const onCreate = async (values) => {
    const addObj = {
      createAt: new Date(),
      updateAt: new Date(),
      date: new Date(values.date).getTime(),
      content: values.content,
      emotion: values.emotion,
      userEmail: "iwn01801@gmail.com",
    };
    await addItems("diary", addObj, dispatch);
  };
  // READ
  // UPDATE
  // DELETE
  useEffect(() => {
    fetchItems(
      "diary",
      {
        conditions: [
          { field: "userEmail", operator: "==", value: "iwn01801@gmail.com" },
        ],
        orderBys: [{ field: "date", direction: "desc" }],
      },
      dispatch
    );
  }, []);
  return (
    <DiaryStateContext.Provider value={state.items}>
      <DiaryDispatchContext.Provider value={{ onCreate }}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/">
                <Route index element={<Homepage />} />
                <Route path="new" element={<NewPage />} />
                {/* <Route path="edit" element={< />} /> */}
                {/* <Route path="diary" element={< />} /> */}
              </Route>
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
