import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

function Logout(props) {
  //   const navigate = useNavigate();
  localStorage.removeItem("member");
  // 최초 랜더링에 쓸수 없다.
  //   navigate("/");
  return <Navigate to="/" />;
  // <Navigate to="/" />안에 useEffect()기능이 들어있다.
}

export default Logout;
