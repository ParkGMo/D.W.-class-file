import React from "react";
import styled from "styled-components";
import Input from "../03/Input";

const Container = styled.div`
  width: 400px;
  margin: 0 auto;
  ${Input} {
    display: block;
    width: 100%;
    margin: 8px 0 16px;
    box-sizing: border-box;
  }
`;

export function Practice(props) {
  return (
    <Container>
      <h1>로그인</h1>
      <label htmlFor="email">Email</label>
      <Input type="text" placeholder="Karinablue@gmail.com" id="email" />
      <label htmlFor="password">Password</label>
      <Input type="password" placeholder="비밀번호" id="password" />
    </Container>
  );
}
