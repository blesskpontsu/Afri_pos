import localforage from "localforage";
import { useAppDispatch, useAppSelector } from "../../../redux/selectors";
import { persistor } from "../../../redux/store";
import { LoginResponse } from "../lib/types";
import { User } from "../../../lib/types";
import { removeToken, setToken } from "../../../lib/cookies";
import { authSlice } from "../lib/authSlice";
import { useIonRouter } from "@ionic/react";

export function useAuth() {
  const { user, isLoggedIn } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const router = useIonRouter();
  const setUser = (user?: User) => dispatch(authSlice.actions.setUser(user));
  const setIsLoggedIn = (isLoggedIn: boolean) =>
    dispatch(authSlice.actions.setIsLoggedIn(isLoggedIn));
  const logout = async () => {
    await persistor.purge();
    await localforage.clear();
    removeToken();
    router.push("/");
  };

  const onLoginSuccess = (data: LoginResponse) => {
    setToken(data.token);
    setUser(data);
    setIsLoggedIn(true);
    router.push("/dashboard");
  };

  return {
    state: {
      user: user as User,
      isLoggedIn,
      balance: user?.balance,
    },
    actions: {
      setUser,
      setIsLoggedIn,
      logout,
      onLoginSuccess,
    },
  };
}
