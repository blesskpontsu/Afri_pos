import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { api } from "../lib/api";

export type MutatorProps<Payload, Response> = {
  url: string;
  method?: "put" | "post" | "patch" | "delete" | "get";
  successMessage?: string;
  errorMessage?: string;
  onSuccess?: (response: Response) => void;
  onError?: (err: any) => {};
  useFormData?: boolean;
};

export const useMutate = <Payload, Response = any>(
  params: MutatorProps<Payload, Response>,
) => {
  const {
    url,
    method = "post",
    onSuccess,
    errorMessage,
    successMessage,
    onError,
    useFormData,
  } = params;
  return useMutation<Response, any, Payload, any>({
    onSuccess: (data) => {
      onSuccess && onSuccess(data);
      successMessage && toast.success(successMessage);
    },
    onError: (error) => {
      console.log("error", error);
      error && toast.error(error.message);
      onError && onError(error);
    },
    mutationFn: (payload: Payload) => {
      return api.request({ url, method, data: payload });
    },
  });
};
