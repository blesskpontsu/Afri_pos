import { API_URL, OTP_URL,OTP_API_KEY } from "./constants";

export const appConfig = {
  apiUrl: API_URL,
  otpUrl: OTP_URL,
  otpApiKey: OTP_API_KEY,
  isDevelopment: import.meta.env.DEV,
  authPrefix: "auth",
  loginTokenName: "afriluck-pos-payment",
};
