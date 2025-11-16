import {  DepositBody, DepositDraft, TransferBody, TransferDraft, WithdrawalBody, WithdrawalDraft } from "./types";

// In dto.ts
export const DepositDraftToDepositBody = (
  transaction: DepositDraft, 
  metadata: { code: string }
): DepositBody => {
  return {
    phone_number: transaction.phone_number,
    code: metadata.code,
    amount: Number(transaction.amount),
    channel: transaction.channel,
    otp: transaction.otp, // Include OTP
    deposit_type: transaction.deposit_type, // Include deposit type
  };
}

export const WithdrawDraftToWithDrawBody = (
  withdraw: WithdrawalDraft
): Omit<WithdrawalBody, "code"> => {
  return {
    amount: Number(withdraw.amount),
    channel: withdraw.channel,
    phone_number: withdraw.phone_number,
    password: withdraw.password,
    otp: withdraw.otp, // Include OTP
  };
}