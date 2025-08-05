export type Transaction = {
  phone_number: string;
  status: string;
  amount: number;
  credited: number;
  type: "Credit" | "Payout" | "Loading";
  date: string;
};

export type DepositDraft = {
  amount: string;
  channel: string;
  phone_number: string;
};

export type DepositBody = {
  phone_number: string;
  code: string;
  amount: number;
  channel: string;
};

export type WithdrawalDraft = {
  amount: string;
  channel: string;
  phone_number: string;
  verify_phone_number: string;
  password: string;
};

export type WithdrawalBody = {
  amount: number;
  channel: string;
  phone_number: string;
  password: string;
  code: string;
};

export type TransferDraft = {
  amount: string;
  password: string;
};

export type TransferBody = {
  code: string;
  amount: number;
  password: string;
};
export type TransactionType = {
  id: string;
  name: string;
  href: string;
};
