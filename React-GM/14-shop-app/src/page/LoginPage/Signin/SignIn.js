import React, { useState } from "react";
import Form from "../../../components/form/Form";
import { useDispatch } from "react-redux";
import { asyncCart, getUserAuth } from "../../../api/firebaseGM";
import { useNavigate } from "react-router";
import { setUser } from "../../../store/user/userSlice";
import { signInWithEmailAndPassword } from "firebase/auth";

function SignIn() {
  const [firebaseError, setFirebaseError] = useState("");
  const dispatch = useDispatch();
  const auth = getUserAuth();
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const { user } = userCredentials;
      const cartItems = JSON.parse(localStorage.getItem("cartProducts")) || [];
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
      title={"로그인"}
      getDataForm={handleLogin}
      firebaseError={firebaseError}
    />
  );
}

export default SignIn;
