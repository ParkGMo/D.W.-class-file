import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.js";
import { LocaleProvider } from "./contexts/LocaleContext.js";
// import App from "./practice/App.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <LocaleProvider defaultValue="ko">
    <App />
  </LocaleProvider>
);
