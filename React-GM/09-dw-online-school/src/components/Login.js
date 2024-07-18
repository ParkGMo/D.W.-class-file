import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Input from "./Input";
import KakaoButton from "./KakaoButton";
import LoginButton from "./LoginButton";
import { getMember } from "../api/firebase";

const LoginContainer = styled.div`
  width: 400px;
  margin: 40px auto;

  ${LoginButton} {
    width: 100%;
    margin: 8px 0;
  }

  ${Input} {
    margin-bottom: 16px;
  }
`;

const Logo = styled.h1`
  font-family: Pretendard;
  text-align: center;
  font-size: 40px;
  background-image: linear-gradient(135deg, aqua, purple);
  background-clip: text;
  color: transparent;
`;

const Description = styled.div`
  color: #848187;
  text-align: center;
`;

const Label = styled.label`
  color: #e1c6f7;
`;

function Login(props) {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [password, setPassword] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    // setEmail((pervValue) => ({ ...pervValue, [email]: e.target.value }));
    // setPassword((pervValue) => ({ ...pervValue, [password]: e.target.value }));
    setValues((pervValue) => ({ ...pervValue, [name]: value }));
    // setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    // 파이어베이스에 접근해서 사용자가 입력한 이메일을 가진 member를 조사한다.
    const { message, memberObj } = await getMember(values);
    if (Object.keys(memberObj).length === 0) {
      alert(message);
    } else {
      localStorage.setItem("member", JSON.stringify(memberObj));
      alert(message);
      navigate(state ? state : "/", { replace: true });
    }
  };
  return (
    <LoginContainer>
      <Logo>DW 온라인스쿨</Logo>
      <Description>
        회원이 아니신가요? <Link>회원가입 하기</Link>
      </Description>
      <form onSubmit={handleLogin}>
        <Label htmlFor="email">이메일</Label>
        <Input
          type="email"
          id="email"
          placeholder="styled@DW.kr"
          // value={email}
          onChange={handleChange}
          name="email"
        />
        <Label htmlFor="password">비밀번호</Label>
        <Input
          type="password"
          id="password"
          placeholder="비밀번호"
          // value={password}
          onChange={handleChange}
          name="password"
        />
        <LoginButton>로그인 하기</LoginButton>
      </form>
      <KakaoButton>카카오 로그인</KakaoButton>
    </LoginContainer>
  );
}

export default Login;
