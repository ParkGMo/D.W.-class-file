import { createContext, useContext, useEffect, useState } from "react";
import { darkTheme, lightTheme } from "../theme/theme";
import { ThemeProvider as StyledProvider } from "styled-components";
import { getSunsetRiseData } from "../api/getLocatinData.js";
import { getTimes } from "../utils/getDateData.js";

// 전역의 공간을 만들어낸다.
const ThemeContext = createContext();

function ThemeChangePorvider({ children }) {
  // 일몰시간 불러오는 API
  // 결과값을 가지고 조건문으로 light냐 dark
  let resultData;
  getSunsetRiseData().then((response) => (resultData = response));
  console.log(resultData);
  // localStorage.setItem("Theme","light");
  const getLocal = localStorage.getItem("theme") || "light";
  // const [themeMode, setThemeMode] = useState("light");
  const [locationData, setLocationData] = useState({});
  const [themeMode, setThemeMode] = useState(`${getLocal}`);

  const themeObject = themeMode === "light" ? lightTheme : darkTheme;

  // console.log(locationData);

  const handleLoad = async () => {
    const data = await getSunsetRiseData();
    const { sunrise, sunset } = data;
    const currentTime = getTimes();
    // light 테마 적용
    if (
      currentTime > Number(sunrise.trim()) &&
      currentTime < Number(sunset.trim())
    ) {
      setThemeMode("light");
    } else {
      setThemeMode("dark");
    }
    setLocationData(data);
  };

  useEffect(() => {
    handleLoad();
  }, []);

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

  localStorage.setItem("theme", themeMode);
  return [themeMode, toggleTheme];
}

export { ThemeChangePorvider, useTheme };
