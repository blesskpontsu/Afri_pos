export interface LoginBody {
  code: string;
  password: string;
}
export interface LoginDraft {
  code: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  code: string;
  first_name: string;
  balance: number;
}
