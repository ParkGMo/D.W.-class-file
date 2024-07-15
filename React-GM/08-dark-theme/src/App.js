import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import AboutPage from "./pages/AboutPage";
import MainPage from "./pages/MainPage";
import { GlobalStyle } from "./theme/GlobalStyle";
import { ThemeChangePorvider } from "./context/ThemeContext";

function App() {
  return (
    <BrowserRouter>
      <ThemeChangePorvider>
        {/* <StyledProvider></StyledProvider>로 인해 theme을 전달해주지 않아도 된다.! */}
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<MainPage />}></Route>
            <Route path="AboutPage" element={<AboutPage />}></Route>
          </Route>
        </Routes>
      </ThemeChangePorvider>
    </BrowserRouter>
  );
}

export default App;
