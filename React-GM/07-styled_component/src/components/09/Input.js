import styled from "styled-components";

const Input = styled.input`
  width: 220px;
  border: 2px solid #eee;
  border-radius: 4px;
  outline: none;
  padding: 16px;
  padding-left: ${({ $paddingLeft }) => ($paddingLeft ? "34px" : "8px")};

  &:focus {
    border-color: limegreen;
    box-shadow: 0 0 5px limegreen;
    transition: border-color 0.2s ease-in-out;
  }
`;

export default Input;
