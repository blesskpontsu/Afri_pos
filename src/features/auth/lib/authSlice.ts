import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../../lib/types";
import { getToken } from "../../../lib/cookies";

export type AuthState = {
  user?: User;
  isLoggedIn: boolean;
};

const initialState: AuthState = {
  user: undefined,
  isLoggedIn: Boolean(getToken()),
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | undefined>) => {
      state.user = action.payload;
    },
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    clearUser: (state) => {
      state.user = undefined;
      state.isLoggedIn = false;
    },
  },
});

export const { setUser, setIsLoggedIn, clearUser } = authSlice.actions;
