import { api } from ".";
import { ApiError } from "./error";
import type { CustomConfigMeta } from "./type";
import { AxiosResponse } from "axios";

const defaultErrorResolver = (error: any) => {
  console.log("erro x", error);
  if (error.response && error.response.data.error) {
    const errorResponse = error.response.data.error as Record<string, string[]>;
    const message = Object.values(errorResponse)?.[0]?.[0];
    return new ApiError(404, message ?? "Something went wrong");
  } else {
    return new ApiError(503, "INTERNAL_ERROR");
  }
};

const defaultResponseResolver = (
  response: AxiosResponse,
  meta: CustomConfigMeta,
) => {
  if (meta.shouldResolve) {
    return response.data;
  }
  return response;
};

export const defaultMeta: CustomConfigMeta = {
  appendSlash: false,
  shouldResolve: true,
  errorResolver: defaultErrorResolver,
  responseResolver: defaultResponseResolver,
};

export const saveRequest = <Payload = any>(
  url: string,
  payload: Payload,
  id?: string,
) =>
  api.request({
    method: id ? "PUT" : "POST",
    url: `${url}${id ? `/${id}` : ""}`,
    data: payload,
  });

export function objectToQueryString(params: any): any {
  return Object.entries(params)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        const data = value
          .filter((v) => v !== null && v !== undefined && v !== "")
          .join(",");
        if (data)
          return `${encodeURIComponent(key)}=${encodeURIComponent(data as any)}`;
        return "";
      } else if (value !== null && value !== undefined && value !== "") {
        return `${encodeURIComponent(key)}=${encodeURIComponent(value as any)}`;
      } else {
        return ""; // Exclude key-value pair if value is null, undefined, or empty string
      }
    })
    .filter(Boolean) // Filter out empty strings (for keys with empty arrays or invalid values)
    .join("&");
}
