import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null, // 유저 정보
    isAuthenticated: false, // 로그인 상태
    error: null, // 에러 메세지
  },
  reducers: {
    // 로그인성공
    loginSuccess(state, action) {
      setUserState(state, action);
      //   Object.keys(state).forEach((key, index) => {
      //     state[key] = action[index];
      //   });
      //   state.user = action.payload;
      //   state.isAuthenticated = true;
      //   state.error = null;
    },
    // 로그인실패
    loginFailure(state, action) {
      setUserState(state, action);
      //   state.user = null;
      //   state.isAuthenticated = false;
      //   state.error = action.payload;
    },
    // 로그아웃
    logOut(state, action) {
      setUserState(state, action);
      //   state.user = null;
      //   state.isAuthenticated = false;
      //   state.error = "null";
    },
  },
});

function setUserState(state, action) {
  Object.keys(state).forEach((key, idx) => {
    state[key] = action.payload[idx];
  });
}

export default userSlice;
export const { loginSuccess, loginFailure, logOut } = userSlice.actions;
