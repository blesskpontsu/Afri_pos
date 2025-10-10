import { useQuery } from "@tanstack/react-query";
import { ApiSuccess } from "../lib/types";
import { api } from "../lib/api";

type UseGetParams<Response, Params, TransformPayload> = {
  endpoint?: string;
  method?: "Get" | "Post";
  params?: Params;
  enabled?: boolean;
  request?: () => Promise<ApiSuccess<Response>>;
  key: any[];
  body?: any;
  dto?: (response: ApiSuccess<Response>) => TransformPayload;
};

export const useGet = <Response, Params = any, TransformPayload = null>(
  argument: UseGetParams<Response, Params, TransformPayload>,
) => {
  const {
    endpoint,
    params,
    dto,
    body,
    key,
    enabled = true,
    request,
  } = argument;
  const { isLoading, data, refetch, error, isRefetching } = useQuery({
    queryKey: key,
    enabled,

    queryFn: () =>
      request
        ? request()
        : api.request<ApiSuccess<Response>>({
            url: endpoint,
            method: "GET",
            data: body,
            params,
          }),
  });

  const response = data?.success;
  return { isLoading, response, refetch, error, isRefetching };
};
