import { createContext, useContext, useState } from "react";
import { darkTheme, lightTheme } from "../theme/theme";
import { ThemeProvider as StyledProvider } from "styled-components";

// 전역의 공간을 만들어낸다.
const ThemeContext = createContext();

function ThemeChangePorvider({ children }) {
  // 일몰시간 불러오는 API
  // 결과값을 가지고 조건문으로 light냐 dark
  const [themeMode, setThemeMode] = useState("light");
  const themeObject = themeMode === "light" ? lightTheme : darkTheme;
  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode }}>
      <StyledProvider theme={themeObject}>{children}</StyledProvider>
    </ThemeContext.Provider>
  );
}

function useTheme() {
  const context = useContext(ThemeContext);
  const { themeMode, setThemeMode } = context;

  const toggleTheme = () => {
    if (themeMode === "light") {
      setThemeMode("dark");
    } else setThemeMode("light");
  };

  return [themeMode, toggleTheme];
}

export { ThemeChangePorvider, useTheme };
