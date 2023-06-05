import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authslice";
import goalReducer from "./goal/goalSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    goals: goalReducer,
  },
});
