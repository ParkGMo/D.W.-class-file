import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home.js";
import New from "./pages/New.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          {/* "/" 이후에 없으면 Home으로 간다. */}
          {/* <Route path="" element={<Home />} /> */}
          <Route index element={<Home />} />
          <Route path="new" element={<New />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
