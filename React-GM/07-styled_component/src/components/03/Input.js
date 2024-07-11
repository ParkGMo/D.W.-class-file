import styled from "styled-components";

const Input = styled.input`
  border: 2px solid #eee;
  border-radius: 4px;
  outline: none;
  padding: 16px;
  &:focus {
    border-color: #776024;
    box-shadow: 0 0 5px rgba(127, 80, 36, 0.5);
    transition: border-color 0.2s ease-in-out;
  }
`;

export default Input;
