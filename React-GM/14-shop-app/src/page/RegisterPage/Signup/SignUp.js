import React, { useState } from "react";
import Form from "../../../components/form/Form";
import { useDispatch } from "react-redux";
import { asyncCart, getUserAuth, joinUser } from "../../../api/firebaseGM";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { setUser } from "../../../store/user/userSlice";

function SignUp() {
  const [firebaseError, setFirebaseError] = useState("");
  const dispatch = useDispatch();
  const auth = getUserAuth();
  const navigate = useNavigate();

  const handleSignupAndLogin = async (email, password) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // expiresIn: 인증 기간 , idToken : 인증 아이디, refreshToken: expiresIn이 지난 아이디를 다시 가져올때(idToken 보다 길다/ if 더 기간이 지나면 다시 로그인해야한다.),
      //   console.log(userCredentials);
      // 프론트앤드의 개인 정보는 암호화해서 저장해두어야한다.!
      const { user } = userCredentials;
      // 로컬스토리지에서 장바구니 데이터 읽기
      const cartItems = JSON.parse(localStorage.getItem("cartProducts")) || [];
      await joinUser(user.uid, user.email);
      await asyncCart(user.uid, cartItems);
      dispatch(
        setUser({ email: user.email, token: user.refreshToken, uid: user.uid })
      );
      navigate("/");
    } catch (error) {
      console.log(error);
      setFirebaseError("이메일 또는 비밀번호가 잘못되었습니다.");
    }
  };

  return (
    <Form
      title={"회원가입"}
      getDataForm={handleSignupAndLogin}
      firebaseError={firebaseError}
    />
  );
}

export default SignUp;
