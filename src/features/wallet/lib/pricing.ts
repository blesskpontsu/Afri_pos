import { DepositDraft } from "./types";

export const DISCOUNT_OR_COMMISSION_RATE = 0.2;
export const DISCOUNT_OR_COMMISSION_PERCENT =
  DISCOUNT_OR_COMMISSION_RATE * 100;

export type DepositType = DepositDraft["deposit_type"];

type DepositAmounts = {
  payable: number;
  commission: number;
  final: number;
};

export const calculateDepositAmounts = (
  amount: number,
  depositType: DepositType
): DepositAmounts => {
  const safeAmount = Number.isFinite(amount) && amount > 0 ? amount : 0;
  const commission = safeAmount * DISCOUNT_OR_COMMISSION_RATE;

  if (depositType === "commission") {
    return {
      payable: safeAmount,
      commission,
      final: safeAmount + commission,
    };
  }

  return {
    payable: safeAmount - commission,
    commission,
    final: safeAmount,
  };
};
