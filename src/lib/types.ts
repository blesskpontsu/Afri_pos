export type User = {
  first_name: string;
  code: string;
  balance: number;
};

export type Account = {
  name: string;
  balance: number;
};


export type ApiSuccess<Payload> = {
  success: Payload;
};
