import { createContext, useContext, useState } from "react";

// Context 가 제공할 기본값을 만든다.
export const LocaleContext = createContext();

export function LocaleProvider({ defaultValue = "ko", children }) {
  const [locale, setLocale] = useState(defaultValue);
  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}
// 전역적으로 쓸 범위를 지정해주어야 한다.  --> index.js

// 매번 useContext와 LocaleContext 값을 가지고 사용하는 것이 번거롭기 때문에
// 이것들을 대신할 수 있는 커스텀 Hook을 만든다.
// useLocal Hook 은 locale 값을 전달해주고,
// useSetLocale 이라는 Hook은 setLocale 함수를 전달해준도록 한다.
export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("반드시 LocaleProvier 안에서 사용해야 합니다.");
  }
  return context.locale;
}
export function useSetLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("반드시 LocaleProvier 안에서 사용해야 합니다.");
  }
  return context.setLocale;
}
