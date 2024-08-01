import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import localForage from "localforage";
import { authSlice } from "../features/auth/lib/authSlice";

const authPersistConfig = {
  key: "auth",
  storage: localForage,
  whitelist: ["user", "currentUserId"],
};

const rootReducer = combineReducers({
  [authSlice.name]: persistReducer(authPersistConfig, authSlice.reducer),
});

export type RootState = ReturnType<typeof rootReducer>;

const modifiedRootReducer = (state: any, action: any) =>
  rootReducer(action.type === "USER_LOGOUT" ? undefined : state, action);

export default modifiedRootReducer;
