import Cookies, { CookieAttributes } from "js-cookie";
import { appConfig } from "./appConfig";

export const getToken = () => Cookies.get(appConfig.loginTokenName);
export const setToken = (token?: string) => {
  setCookie(appConfig.loginTokenName, token, {
    expires: 7,
  });
};

export const removeToken = () => Cookies.remove(appConfig.loginTokenName);

const setCookie = (
  name: string,
  token?: string,
  options?: CookieAttributes,
) => {
  if (!token) {
    Cookies.remove(name);
  } else {
    Cookies.set(name, token, options ?? { expires: 60 * 60 * 24 * 30 });
  }
};
