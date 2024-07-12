import React from "react";
import styled from "styled-components";
import kakao from "./kakao.svg";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 320px;
  display: flex;
  flex-direction: column;
  & h1 {
    background: linear-gradient(30deg, skyblue 40%, violet 80%);
    padding: 0%;
    border: none;
    text-decoration: none;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;
const SignUP = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  & a {
    color: purple;
    text-decoration: underline;
    font-weight: bold;
    cursor: pointer;
  }
  & p {
    margin: 12px 0;
    font-size: 14px;
    color: black;
  }
`;
const LoginBox = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: baseline;
  & label {
    margin-top: 16px;
    font-weight: bold;
  }
`;
const Input = styled.input`
  display: block;
  font-size: 16px;
  border: none;
  border-bottom: 2px solid #eee;
  outline: none;
  width: 97%;
  padding: 16px 4px;
  &:focus {
    border-bottom: 2px solid skyblue;
    /* box-shadow: 0 0 5px rgba(127, 80, 36, 0.5); */
  }
  &::placeholder {
    color: #c4c5cd;
  }
`;
const Button = styled.button`
  background-color: ${({ $colorch }) => ($colorch ? "#6500c3" : "#fee500")};
  width: 100%;
  border: none;
  color: ${({ $colorch }) => ($colorch ? "#fff" : "black")};
  margin-top: 12px;
  padding: 16px;
  font-size: 18px;
  border-radius: 3px;
  cursor: pointer;
  &:hover {
    background-color: #7760b4;
  }
`;
const KakaoButton = styled(Button)`
  background-image: url(${kakao});
  background-size: 28px;
  background-repeat: no-repeat;
  background-position: 70px center;
  &:hover {
    background-color: orange;
  }
`;
function Login(props) {
  return (
    <Container>
      <h1>DW 온라인스쿨</h1>
      <SignUP>
        <p>회원이 아니신가요?</p>&nbsp;&nbsp;
        <Link>회원가입 하기</Link>
      </SignUP>
      <LoginBox>
        <label htmlFor="email">이메일</label>
        <Input type="text" placeholder="Karinablue@gmail.com" id="email" />
        <label htmlFor="password">비밀번호</label>
        <Input type="password" placeholder="password" id="password" />
      </LoginBox>
      <Button $colorch>로그인하기</Button>
      <KakaoButton>카카오 로그인</KakaoButton>
    </Container>
  );
}

export default Login;
