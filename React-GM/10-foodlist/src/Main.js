import "./Main.css";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import HomePage from "./page/HomePage";
import App from "./components/App";

function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          {/* <Route index element={<HomePage />}></Route> */}
        </Route>
        {/* <Route path="/" element={<App />}></Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
