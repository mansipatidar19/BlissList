import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: sessionStorage.getItem("token") || "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState, 
  reducers: {
    // Reducer function to set the authentication token
    setToken(state, action) {
      // Updating token in the state
      state.token = action.payload;
      // Storing token in sessionStorage
      sessionStorage.setItem("token", action.payload);
    }, // Reducer function to clear the authentication token
    clearToken(state) {
      // Clearing token in the state
      state.token = "";
      // Removing token from sessionStorage
      sessionStorage.removeItem("token");
    },
  },
});

// Exporting action creators
export const { setToken, clearToken } = authSlice.actions;

// Selector function to retrieve token from the state
export const selectToken = (state) => state.auth.token;

// Exporting the reducer function
export default authSlice.reducer;
