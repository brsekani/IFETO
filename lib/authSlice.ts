import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { AuthState } from "../app/features/auth/auth.types";

// Load token from localStorage on first load
const storedToken =
  typeof window !== "undefined"
    ? localStorage.getItem("IFETOAccessToken")
    : null;

const initialState: AuthState = {
  accessToken: storedToken,
  isAuthenticated: !!storedToken,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ accessToken: string }>) => {
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;

      // Save to localStorage
      localStorage.setItem("IFETOAccessToken", action.payload.accessToken);
    },

    tokenReceived: (state, action: PayloadAction<{ accessToken: string }>) => {
      state.accessToken = action.payload.accessToken;
      localStorage.setItem("IFETOAccessToken", action.payload.accessToken);
    },

    logOut: (state) => {
      state.accessToken = null;
      state.isAuthenticated = false;

      // Remove from localStorage
      localStorage.removeItem("IFETOAccessToken");
    },
  },
});

export const { setCredentials, tokenReceived, logOut } = authSlice.actions;
export default authSlice.reducer;

// Selectors
export const selectCurrentAccessToken = (state: RootState) =>
  state.auth.accessToken;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
