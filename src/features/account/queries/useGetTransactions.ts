import { Transaction } from "@features/wallet/lib/types";
import { useGet } from "@hooks/useGet";
import { useMemo } from "react";

export const useGetTransactions = () => {
  const { response, ...rest } = useGet<Transaction[]>({
    key: ["transactions"],
    endpoint: "agent/transactions",
    method: "Get",
    enabled: true,
  });

  const sortedTransactions = useMemo(() => {
    if (!response) return [];
    return response.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }, [response]);
  return {
    ...rest,
    response: sortedTransactions,
  };
};
