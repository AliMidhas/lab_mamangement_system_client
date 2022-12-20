import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    id: null,
    name: null,
    userName: null,
    token: null,
  },
  reducers: {
    login(state, action) {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.userName = action.payload.userName;
      state.token = action.payload.token;
    },
    logout(state, action) {
      state.id = null;
      state.name = null;
      state.userName = null;
      state.token = null;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
