import styled from "styled-components";

const SIZES = {
  large: 16,
  medium: 12,
  small: 8,
};

const Input = styled.input`
  border: 2px solid #eee;
  border-radius: ${({ $round }) => ($round ? "9999px" : "4px")};
  outline: none;
  padding: ${({ size }) => SIZES[size] ?? SIZES["medium"]}px;
  font-size: ${({ size }) => SIZES[size] ?? SIZES["medium"]}px;
  &:focus {
    border-color: ${({ $error }) => ($error ? "red" : "skyblue")};
    box-shadow: 0 0 5px ${({ $error }) => ($error ? "red" : "skyblue")};
    transition: border-color 0.3s ease-in-out;
  }
`;

export default Input;
