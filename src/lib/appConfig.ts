import { API_URL } from "./constants";

export const appConfig = {
  apiUrl: API_URL,
  isDevelopment: import.meta.env.DEV,
  authPrefix: "auth",
  loginTokenName: "afriluck-pos-payment",
};
