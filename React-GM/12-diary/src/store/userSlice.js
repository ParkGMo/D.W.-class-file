import { createSlice } from "@reduxjs/toolkit";
import { useAuthState } from "react-firebase-hooks/auth";
import { getUserAuth } from "../api/firebaseGM";

// const auth = getUserAuth();
// const [user] = useAuthState(auth);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null, // 유저 정보
    isAuthenticated: false, // 로그인 상태
    error: null, // 에러 메세지
  },
  reducers: {
    // 로그인성공
    logIn: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    // 로그인실패
    logOut: (state, action) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    // 로그아웃
    logInError: (state, action) => {
      state.error = "Log In ERROR";
    },
  },
});

export default userSlice;
export const { logIn, logOut, logInError } = userSlice.actions;
