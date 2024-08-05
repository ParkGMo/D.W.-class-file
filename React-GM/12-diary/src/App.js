import "./App.css";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Homepage from "./pages/Homepage";
import NewPage from "./pages/NewPage";
import { createContext, useEffect, useReducer } from "react";
import {
  addItems,
  deleteItems,
  fetchItems,
  initialState,
  reducer,
  updateItems,
} from "./api/itemReducer";
import DiaryPage from "./pages/DiaryPage";
import EditPage from "./pages/EditPage";
import Button from "./components/Button";
import LoginPage from "./pages/LoginPage";
import { getUserAuth } from "./api/firebaseGM";
import { userInitialState, userReducer } from "./api/userReducer";
import { useAuthState } from "react-firebase-hooks/auth";

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const auth = getUserAuth();
  const [userState, LoginDispatch] = useReducer(userReducer, userInitialState);
  const [user] = useAuthState(auth);
  // const Navigate = useNavigate();
  // const goLogin = () => {
  //   Navigate("./login");
  // };
  // CREATE
  const onCreate = async (values) => {
    const addObj = {
      createAt: new Date(),
      updateAt: new Date(),
      date: new Date(values.date).getTime(),
      content: values.content,
      emotion: values.emotion,
      userEmail: user.email,
    };
    await addItems("diary", addObj, dispatch);
  };
  // READ
  // UPDATE
  // value에 docId 가 포함되어 파라미터에 포함하지 않아도 된다.
  const onUpdate = async (values) => {
    const updateObj = {
      updateAt: new Date().getTime(),
      date: new Date(values.date).getTime(),
      content: values.content,
      emotion: values.emotion,
    };
    await updateItems("diary", values.docId, updateObj, dispatch);
  };
  // DELETE
  const onDelete = async (docId) => {
    await deleteItems("diary", docId, dispatch);
  };

  useEffect(() => {
    fetchItems(
      "diary",
      {
        conditions: [
          {
            field: "userEmail",
            operator: "==",
            value: user ? user.email : "admin@gmail.com",
          },
        ],
        orderBys: [{ field: "date", direction: "desc" }],
      },
      dispatch
    );
  }, [user]);
  return (
    <DiaryStateContext.Provider value={{ diaryList: state.items, auth }}>
      <DiaryDispatchContext.Provider value={{ onCreate, onUpdate, onDelete }}>
        <BrowserRouter>
          <div className="App">
            {/* <Button text={"로그인"} className="btn_login" /> */}
            <Routes>
              <Route path="/">
                <Route index element={<Homepage />} />
                <Route path="new" element={<NewPage />} />
                <Route path="edit/:id" element={<EditPage />} />
                {/*동적 주소 경로 : path="diary/:id  */}
                <Route path="diary/:id" element={<DiaryPage />} />
                <Route path="login" element={<LoginPage />} />
              </Route>
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
