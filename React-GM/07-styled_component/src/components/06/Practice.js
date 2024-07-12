import React from "react";
import styled from "styled-components";
import Input from "./Input";

const Container = styled.div`
  ${Input} {
    margin: 10px;
  }
`;

export function Practice(props) {
  return (
    <Container>
      <h1>Size</h1>
      <Input size="small" />
      <Input size="medium" />
      <Input size="large" />
      <h1>Round</h1>
      <Input $round />
      <h1>Error</h1>
      <Input $error />
    </Container>
  );
}
