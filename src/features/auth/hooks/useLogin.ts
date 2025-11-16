import { useState, useEffect } from "react";
import { useAuth } from "./useAuth";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "./api";
import { LoginBody } from "../lib/types";
import { ApiError } from "../../../lib/api/error";
import { toast } from "react-toastify";

export function useLogin() {
  const { actions } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");
  const { mutate, isPending } = useMutation({
    mutationFn: (payload: LoginBody) => authApi.login(payload),
    onSuccess: (response) => {
      toast.success("Login successful");
      actions.onLoginSuccess(response);
    },
    onError: (error: ApiError) => {
      toast.error("Failed to login");
    },
  });

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => setErrorMessage(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  return {
    state: { isPending, errorMessage },
    actions: {
      setErrorMessage,
      login: mutate,
    },
  };
}
