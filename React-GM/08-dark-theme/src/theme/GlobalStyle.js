import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

// 스타일을 적용하는 컴포넌트
export const GlobalStyle = createGlobalStyle`
${reset}
body {
    background: ${({ theme }) => theme.bgColor};
    color: ${({ theme }) => theme.textColor};
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    font-family: Pretendard, sans-serif;
}
`;
