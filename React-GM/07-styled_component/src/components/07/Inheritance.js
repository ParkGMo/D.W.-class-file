import React from "react";
import TermsOfService from "./TermsOfService";
import Button from "./Button";
import styled from "styled-components";

// (TermsOfService)에서는 className을 줘서  styled을 준다.
const StyledTermsOfService = styled(TermsOfService)`
  background-color: #ededed;
  width: 400px;
  margin: 40px auto;
  border-radius: 8px;
  padding: 16px;
`;
const SubmitButton = styled(Button)`
  background-color: #de117d;
  width: 200px;
  margin: 0 auto;
  padding: 16px 40px;
  &:hover {
    background-color: #c50864;
  }
`;

function Inheritance(props) {
  return (
    <div>
      <StyledTermsOfService />
      <SubmitButton>˗ˋˏ계속하기ˎˊ˗</SubmitButton>
    </div>
  );
}

export default Inheritance;
