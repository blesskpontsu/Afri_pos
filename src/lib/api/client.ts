import axios from "axios";
import type { AxiosWrapperConfig } from "./type";
import { defaultMeta, objectToQueryString } from "./utils";
import { authSlice } from "../../features/auth/lib/authSlice";
import { store } from "../../redux/store";

export const createAxiosInstance = (defaultConfig?: AxiosWrapperConfig) => {
  const { meta: metaConfig, ...axiosConfig } = defaultConfig || {};
  const instance = axios.create({
    ...axiosConfig,
    paramsSerializer: (params) => {
      return objectToQueryString(params);
    },
  });

  const mergeMeta = (meta = {}) => ({
    ...defaultMeta,
    ...metaConfig,
    ...meta,
  });

  instance.interceptors.request.use(
    async (config: any) => {
      const meta = mergeMeta(config.meta);

      config.headers = {
        ...(meta.getAuthHeader ? meta.getAuthHeader() : {}),
        Accept: "application/json",
        "Content-Type": "application/json",
        ...config.headers,
      };

      if (
        meta.appendSlash &&
        ["get", "post"].includes(config!.method!.toLowerCase())
      ) {
        config.url = config.url?.endsWith("/") ? config.url : `${config.url}/`;
      }
      return config;
    },
    (error) => {
      Promise.reject(error);
    },
  );

  instance.interceptors.response.use(
    (response: any) => {
      const meta = mergeMeta(response.config.meta);
      return meta.responseResolver
        ? meta.responseResolver(response, meta)
        : response;
    },
    (error) => {
      const meta = mergeMeta(error.config.meta);
      if (error?.response?.status === 403) {
        store.dispatch(authSlice.actions.setIsLoggedIn(false));
        //removeToken()
        //  localStorage.clear()
        // window.location.reload()
      }
      throw meta.errorResolver ? meta.errorResolver(error) : error;
    },
  );
  return instance;
};
