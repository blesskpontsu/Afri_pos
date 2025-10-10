import { getToken } from "../cookies";

export { endpoints } from "./endpoints";
import { appConfig } from "../appConfig";
import { createAxiosInstance } from "./client";
import { AxiosWrapperConfig } from "./type";

const request = createAxiosInstance({
  meta: {
    getAuthHeader: () =>
      getToken() ? { Authorization: `Bearer ${getToken()}` } : undefined,
  },
});

request.defaults.baseURL = appConfig.apiUrl;

export const api = {
  request: <Response = any>(config: AxiosWrapperConfig): Promise<Response> =>
    request(config),
  delete: <Response = any>(
    url: string,
    config: AxiosWrapperConfig = {},
  ): Promise<Response> => request.delete(url, config),
  get: <Response = any>(
    url: string,
    config: AxiosWrapperConfig = {},
  ): Promise<Response> =>
    request.get(url, {
      ...config,
    }),
  post: <Response = any>(
    url: string,
    data: any,
    config: AxiosWrapperConfig = {},
  ): Promise<Response> =>
    request({
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
    request({
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
    request({
      url,
      method: "put",
      data,
      ...config,
    }),
};
