import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import New from "./pages/New";

function App() {
  <BrowserRouter>
    <Routes>
      <Route path="/">
        {/* "/" 이후에 없으면 Home으로 간다. */}
        {/* <Route path="" element={<Home />} /> */}
        <Route index element={<Home />} />
        <Route path="new" element={<New />} />
      </Route>
    </Routes>
  </BrowserRouter>;
}
// <a href="/new" target="_self">새컬러 등록</a>
export default App;
