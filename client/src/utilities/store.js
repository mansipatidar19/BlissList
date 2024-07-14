import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import useReducer from "./userReducer";

export const store = configureStore({
  reducer: { auth: authReducer, user: useReducer },
});
