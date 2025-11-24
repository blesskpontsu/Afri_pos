import { TransactionType } from "./types";

export const transactionTypes: TransactionType[] = [
  {
    id: "deposit",
    name: "Topup",
    href: "/deposit",
  },
  {
    id: "withdraw",
    name: "Withdraw",
    href: "/withdraw",
  },
  {
    id: "transfer",
    name: "Transfer",
    href: "/transfer",
  },
];
