import React from "react";
import ReactDOM from "react-dom/client";
import Main from "./Main";
import { LocaleProvider } from "./contexts/LocalContext";
import App from "./components/App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <LocaleProvider>
    <App />
  </LocaleProvider>
);
