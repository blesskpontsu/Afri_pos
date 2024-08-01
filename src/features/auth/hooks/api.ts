import { LoginBody, LoginResponse } from "../lib/types";
import { api } from "../../../lib/api";
import { ApiSuccess } from "../../../lib/types";

export const authApi = {
  login: async (payload: LoginBody): Promise<LoginResponse> => {
    const response = await api.post<ApiSuccess<LoginResponse>>(
      "agent/login",
      payload,
    );
    return response.success;
  },
};
