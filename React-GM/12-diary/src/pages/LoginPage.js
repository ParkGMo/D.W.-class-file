import React, { useContext } from "react";
import "./LoginPage.css";
import * as FcIcons from "react-icons/fc";
import { DiaryStateContext } from "../App";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { getUserAuth } from "../api/firebaseGM";

function LoginPage() {
  // const { auth } = useContext(DiaryStateContext);
  const auth = getUserAuth();
  const Navigate = useNavigate();
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    Navigate("/");
  };

  return (
    <div className="login_box">
      <button onClick={signInWithGoogle}>
        <FcIcons.FcGoogle />
        <span>Continue with Google</span>
      </button>
    </div>
  );
}

export default LoginPage;
