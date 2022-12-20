import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import cubeSlice from "./cubeSlice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    cube: cubeSlice.reducer,
  },
});

export default store;
