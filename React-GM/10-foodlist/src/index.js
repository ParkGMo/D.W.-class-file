import React from "react";
import ReactDOM from "react-dom/client";
import Main from "./Main";
import { LocaleProvider } from "./contexts/LocalContext";
import App from "./components/App";
import { Provider } from "react-redux";
import store from "./store/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <LocaleProvider>
      <App />
    </LocaleProvider>
  </Provider>
);
