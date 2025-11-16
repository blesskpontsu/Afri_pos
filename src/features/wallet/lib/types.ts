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
  otp?: string; // Add OTP field
  deposit_type: 'commission' | 'discount'; // Add deposit type
};

export type DepositBody = {
  phone_number: string;
  code: string;
  amount: number;
  channel: string;
  otp?: string; // Add OTP field
  deposit_type: 'commission' | 'discount'; // Add deposit type
};

export type WithdrawalDraft = {
  amount: string;
  channel: string;
  phone_number: string;
  password: string;
  otp?: string; // Add OTP field
};

export type WithdrawalBody = {
  amount: number;
  channel: string;
  phone_number: string;
  password: string;
  code: string;
  otp?: string; // Add OTP field
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
