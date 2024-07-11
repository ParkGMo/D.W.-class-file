import React from "react";
import styled from "styled-components";
import nailIcon from "./nail.png";

const Icon = styled.img`
  width: 16px;
  height: 16px;
`;
const StyledButton = styled.button`
  background-color: #6750a4;
  border: none;
  padding: 16px;
  width: 120px;
  height: 50px;
  color: white;
  & ${Icon} {
    margin-right: 4px;
  }
  & {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &:hover {
    color: black;
  }
  &:hover {
    ${Icon} {
      opacity: 0.6;
    }
  }
`;
// const StyledButton = styled.button`
//   background-color: purple;
//   width: 120px;
//   height: 50px;
//   color: white;
//   &:hover {
//     color: black;
//   }
// `;

function Button({ children }) {
  return (
    <StyledButton>
      <Icon src={nailIcon} />
      {children}
    </StyledButton>
  );
}

export default Button;
