import { Button } from "@/components/ui/button";
import { useWallet } from "../hooks/useToken";
import { useUseTokens } from "../hooks/useToken";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

interface TokenProtectedButtonProps {
  disabled?: boolean;
  requiredTokens: number;
  onAction: () => Promise<void>;
  children: React.ReactNode;
  variant?: "default" | "outline";
  className?: string;
}

export const TokenProtectedButton = ({
  disabled = false,
  requiredTokens,
  onAction,
  children,
  variant = "default",
  className,
}: TokenProtectedButtonProps) => {
  const { data: wallet, isLoading } = useWallet();
  const useTokensMutation = useUseTokens();
  const [isActionPending, setIsActionPending] = useState(false);

  const balance = wallet?.wallet.balance || 0;
  const hasEnoughBalance = balance >= requiredTokens;
  const isDisabled =
    isLoading ||
    useTokensMutation.isPending ||
    isActionPending ||
    !hasEnoughBalance ||
    disabled;

  const handleClick = async () => {
    if (isDisabled) {
      if (!hasEnoughBalance) {
        toast({
          title: "Insufficient Tokens",
          description: `You need ${requiredTokens} tokens to perform this action. Current balance: ${balance}`,
          variant: "destructive",
        });
      }
      return;
    }

    try {
      setIsActionPending(true);
      await useTokensMutation.mutateAsync({ tokenAmount: requiredTokens });
      await onAction();
      toast({
        title: "Success",
        description: `Action completed. Tokens remaining: ${balance - requiredTokens}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to perform action. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsActionPending(false);
    }
  };

  return (
    <Button
      type="button"
      variant={variant}
      onClick={handleClick}
      disabled={isDisabled}
      className={className}
    >
      {useTokensMutation.isPending || isActionPending ? (
        <div className="flex items-center gap-2">
          <div className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          Processing...
        </div>
      ) : (
        children
      )}
    </Button>
  );
};
