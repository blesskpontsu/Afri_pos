import { LoginBody, LoginDraft } from "./types";

export const LoginnDraftToLoginbody = (account: LoginDraft): LoginBody => {
  return {
    code: account.code,
    password: account.password,
  };
};
