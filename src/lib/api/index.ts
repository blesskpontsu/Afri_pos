import { getToken } from "../cookies";
export { endpoints } from "./endpoints";
import { appConfig } from "../appConfig";
import { createAxiosInstance } from "./client";
import { AxiosWrapperConfig } from "./type";

// Main API instance (Bearer token authentication)
const mainAPI = createAxiosInstance({
  meta: {
    getAuthHeader: () =>
      getToken() ? { Authorization: `Bearer ${getToken()}` } : undefined,
  },
});
mainAPI.defaults.baseURL = appConfig.apiUrl;

// OTP API instance (x-afriluck-key authentication)
const otpAPI = createAxiosInstance({
  meta: {
    getAuthHeader: () => ({
      'x-afriluck-key': appConfig.otpApiKey,
    }),
  },
});
otpAPI.defaults.baseURL = appConfig.otpUrl;

// Export main API (existing functionality)
export const api = {
  request: <Response = any>(config: AxiosWrapperConfig): Promise<Response> =>
    mainAPI(config),
  delete: <Response = any>(
    url: string,
    config: AxiosWrapperConfig = {},
  ): Promise<Response> => mainAPI.delete(url, config),
  get: <Response = any>(
    url: string,
    config: AxiosWrapperConfig = {},
  ): Promise<Response> =>
    mainAPI.get(url, {
      ...config,
    }),
  post: <Response = any>(
    url: string,
    data: any,
    config: AxiosWrapperConfig = {},
  ): Promise<Response> =>
    mainAPI({
      url,
      method: "post",
      data,
      ...config,
    }),
  patch: <Response = any>(
    url: string,
    data: any,
    config: AxiosWrapperConfig = {},
  ): Promise<Response> =>
    mainAPI({
      url,
      method: "patch",
      data,
      ...config,
    }),
  put: <Response = any>(
    url: string,
    data: any,
    config: AxiosWrapperConfig = {},
  ): Promise<Response> =>
    mainAPI({
      url,
      method: "put",
      data,
      ...config,
    }),
};

// Export OTP API separately
export const otpApi = {
  request: <Response = any>(config: AxiosWrapperConfig): Promise<Response> =>
    otpAPI(config),
  delete: <Response = any>(
    url: string,
    config: AxiosWrapperConfig = {},
  ): Promise<Response> => otpAPI.delete(url, config),
  get: <Response = any>(
    url: string,
    config: AxiosWrapperConfig = {},
  ): Promise<Response> =>
    otpAPI.get(url, {
      ...config,
    }),
  post: <Response = any>(
    url: string,
    data: any,
    config: AxiosWrapperConfig = {},
  ): Promise<Response> =>
    otpAPI({
      url,
      method: "post",
      data,
      ...config,
    }),
  patch: <Response = any>(
    url: string,
    data: any,
    config: AxiosWrapperConfig = {},
  ): Promise<Response> =>
    otpAPI({
      url,
      method: "patch",
      data,
      ...config,
    }),
  put: <Response = any>(
    url: string,
    data: any,
    config: AxiosWrapperConfig = {},
  ): Promise<Response> =>
    otpAPI({
      url,
      method: "put",
      data,
      ...config,
    }),
};