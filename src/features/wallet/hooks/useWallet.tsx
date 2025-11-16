import { useIonRouter } from "@ionic/react";
import {
  DepositBody,
  Transaction,
  TransferBody,
  WithdrawalBody,
} from "../lib/types";
import { useMutate } from "../../../hooks/useMutate";
import { useAuth } from "../../auth/hooks/useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api, endpoints } from "../../../lib/api";
import { refresh } from "ionicons/icons";
import { useGetTransactions } from "@features/account/queries/useGetTransactions";

export function useWallet() {
  const router = useIonRouter();
  const { refetch, isRefetching } = useGetTransactions();
  const {
    state: { user },
    actions: { setUser },
  } = useAuth();

  const balanceMutation = useMutation({
    mutationFn: (payload: { code: string }) =>
      api.get(endpoints.balance, {
        params: payload,
      }),
    onSuccess: (data) => {
      if (user) {
        setUser({
          ...user,
          balance: Number(data.success.balance),
        });
      }
    },
  });

  const getBalance = (onComplete?: () => void) => {
    balanceMutation.mutate(
      { code: user!.code },
      {
        onSettled: () => {
          onComplete?.();
        },
      },
    );
  };

  const refresh = () => {
    getBalance();
    refetch();
  };

  const { mutate, isPending, isSuccess, isError } = useMutate<
    DepositBody,
    Transaction
  >({
    url: "/agent/deposit",
    successMessage: "Deposit Request sent Successful",
    errorMessage: "Failed to send Deposit Request",
    onSuccess: () => {
      getBalance(() => {
        router.push("/dashboard");
      });
    },
  });

  const withdrawMutation = useMutate<WithdrawalBody, Transaction>({
    url: "/agent/withdrawal",
    successMessage: "Withdraw Request sent Successful",
    errorMessage: "Failed to send Deposit Request",
    onSuccess: () => {
      getBalance(() => {
        router.push("/dashboard");
      });
    },
  });

  const transferMutation = useMutate<TransferBody, Transaction>({
    url: "/agent/transfer",
    successMessage: "Transfer completed Successful",
    errorMessage: "Failed to transfer",
    onSuccess: () => {
      getBalance(() => {
        router.push("/dashboard");
      });
    },
  });

  return {
    state: {
      isLoading: isPending,
      isSuccess,
      isError,
      isWithdrawing: withdrawMutation.isPending || balanceMutation.isPending,
      isTransfering: transferMutation.isPending || balanceMutation.isPending,
      loadingBalance: balanceMutation.isPending || balanceMutation.isPending,
      isRefetchingTransactions: isRefetching,
    },
    actions: {
      deposit: mutate,
      withdraw: withdrawMutation.mutate,
      transfer: transferMutation.mutate,
      getBalance,
      refresh,
    },
  };
}
