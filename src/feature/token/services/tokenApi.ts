import { PaymentStatus, PaymentType } from "@/feature/token/type";
import { handleApiError } from "@/lib/utils";
import api from "@/services/baseApi";
import {
  TokenWalletResponse,
  TokenPackagesResponse,
  PaymentUrlResponse,
  TransactionsResponse,
  TransactionResponse,
  CreateTransactionDto,
  UseTokensDto,
} from "@/services/swagger-types";

export interface FindAllTransactionsQuery {
  paymentType?: PaymentType;
  status?: PaymentStatus;
  type?: string;
  from?: string;
  to?: string;
  page?: number;
  perPage?: number;
}

const tokenApi = {
  // Wallet
  getWallet() {
    return api
      .tokenControllerGetWallet()
      .then((res: any) => res.data as TokenWalletResponse)
      .catch((err: any) => {
        handleApiError(err);
        throw err.response.data;
      });
  },

  // Packages
  getPackages() {
    return api
      .tokenControllerGetPackages()
      .then((res: any) => res.data as TokenPackagesResponse)
      .catch((err: any) => {
        handleApiError(err);
        throw err.response.data;
      });
  },

  // Transactions
  createTransaction(data: CreateTransactionDto) {
    return api
      .tokenControllerCreateTransaction(data)
      .then((res: any) => res.data as PaymentUrlResponse)
      .catch((err: any) => {
        handleApiError(err);
        throw err.response.data;
      });
  },

  getTransactions(query: FindAllTransactionsQuery) {
    return api
      .tokenControllerGetTransactions(query)
      .then((res: any) => res.data as TransactionsResponse)
      .catch((err: any) => {
        handleApiError(err);
        throw err.response.data;
      });
  },

  getAdminTransactions(query: FindAllTransactionsQuery) {
    return api
      .tokenControllerGetAdminTransactions(query)
      .then((res: any) => res.data as TransactionsResponse)
      .catch((err: any) => {
        handleApiError(err);
        throw err.response.data;
      });
  },

  // Token Usage
  useTokens(data: UseTokensDto) {
    return api
      .tokenControllerUseTokens(data)
      .then((res: any) => res.data as TransactionResponse)
      .catch((err: any) => {
        handleApiError(err);
        throw err.response.data;
      });
  },
};

export default tokenApi;
