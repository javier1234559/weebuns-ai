import { useWallet } from "./useToken";
import { TOKEN_COSTS } from "../constants";

export const useTokenCosts = () => {
  const { data: wallet } = useWallet();
  const balance = wallet?.wallet.balance || 0;

  const canAfford = (cost: number) => balance >= cost;

  const getRemainingBalance = (cost: number) => balance - cost;

  return {
    balance,
    canAfford,
    getRemainingBalance,
    costs: TOKEN_COSTS,
  };
};
