"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import tokenApi, { FindAllTransactionsQuery } from "../services/tokenApi";
import {
  TokenWalletResponse,
  TokenPackagesResponse,
  TransactionsResponse,
  CreateTransactionDto,
  UseTokensDto,
} from "@/services/swagger-types";

const TOKEN_BASE = ["token"] as const;

export const TOKEN_KEY_FACTORY = {
  all: TOKEN_BASE,
  wallet: () => [...TOKEN_BASE, "wallet"] as const,
  packages: () => [...TOKEN_BASE, "packages"] as const,
  transactions: () => [...TOKEN_BASE, "transactions"] as const,
  adminTransactions: () => [...TOKEN_BASE, "admin-transactions"] as const,
  transactionList: (params: FindAllTransactionsQuery) =>
    [...TOKEN_BASE, "transactions", params] as const,
  adminTransactionList: (params: FindAllTransactionsQuery) =>
    [...TOKEN_BASE, "admin-transactions", params] as const,
} as const;

// Wallet hooks
export const useWallet = (options?: UseQueryOptions<TokenWalletResponse>) => {
  return useQuery({
    queryKey: TOKEN_KEY_FACTORY.wallet(),
    queryFn: () => tokenApi.getWallet(),
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...(typeof options === "object" ? options : {}),
  });
};

// Packages hooks
export const usePackages = (
  options?: UseQueryOptions<TokenPackagesResponse>,
) => {
  return useQuery({
    queryKey: TOKEN_KEY_FACTORY.packages(),
    queryFn: () => tokenApi.getPackages(),
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...(typeof options === "object" ? options : {}),
  });
};

// Transaction hooks
export const useTransactions = (
  query: FindAllTransactionsQuery,
  options?: UseQueryOptions<TransactionsResponse>,
) => {
  return useQuery({
    queryKey: TOKEN_KEY_FACTORY.transactionList(query),
    queryFn: () => tokenApi.getTransactions(query),
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...(typeof options === "object" ? options : {}),
  });
};

export const useAdminTransactions = (
  query: FindAllTransactionsQuery,
  options?: UseQueryOptions<TransactionsResponse>,
) => {
  return useQuery({
    queryKey: TOKEN_KEY_FACTORY.adminTransactionList(query),
    queryFn: () => tokenApi.getAdminTransactions(query),
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...(typeof options === "object" ? options : {}),
  });
};

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTransactionDto) =>
      tokenApi.createTransaction(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: TOKEN_KEY_FACTORY.transactions(),
      });
    },
  });
};

export const useUseTokens = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UseTokensDto) => tokenApi.useTokens(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: TOKEN_KEY_FACTORY.wallet(),
      });
    },
  });
};
