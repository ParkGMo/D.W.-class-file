import { createSlice } from "@reduxjs/toolkit";

initialState = {
  email: "",
  token: "",
  uid: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.uid = action.payload.uid;

      localStorage.setItem("user", JSON.stringify(state));
    },
  },
});

export default userSlice.reducer;
