import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("access_token"),
    user: null,
  },
  reducers: {
    setCredentials: (state, action) => {
      state.token = action.payload.access_token;
      state.user = action.payload.user;
      localStorage.setItem("access_token", action.payload.access_token);
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("access_token");
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setCredentials, logout, setUser } = authSlice.actions;
export default authSlice;
