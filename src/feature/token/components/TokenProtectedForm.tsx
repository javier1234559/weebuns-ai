import { useWallet } from "../hooks/useToken";
import { useUseTokens } from "../hooks/useToken";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import { FormProvider, UseFormReturn } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface TokenProtectedFormProps {
  requiredTokens: number;
  form: UseFormReturn<any>;
  onSubmit: (data: any) => void;
  onError?: (errors: any) => void;
  children: React.ReactNode;
  className?: string;
  confirmTitle?: string;
  confirmDescription?: string;
}

export const TokenProtectedForm = ({
  requiredTokens,
  form,
  onSubmit,
  onError,
  children,
  className,
  confirmTitle = "Confirm Submission",
  confirmDescription = "Are you sure you want to submit? This action will cost tokens.",
}: TokenProtectedFormProps) => {
  const { data: wallet, isLoading } = useWallet();
  const useTokensMutation = useUseTokens();
  const [isActionPending, setIsActionPending] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [pendingData, setPendingData] = useState<any>(null);

  const balance = wallet?.wallet.balance || 0;
  const hasEnoughBalance = balance >= requiredTokens;
  const isDisabled =
    isLoading ||
    useTokensMutation.isPending ||
    isActionPending ||
    !hasEnoughBalance;

  const handleSubmit = async (data: any) => {
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

    setPendingData(data);
    setShowConfirmDialog(true);
  };

  const handleConfirm = async () => {
    if (!pendingData) return;

    try {
      setIsActionPending(true);
      await useTokensMutation.mutateAsync({ tokenAmount: requiredTokens });
      await onSubmit(pendingData);
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
      onError?.(error);
    } finally {
      setIsActionPending(false);
      setShowConfirmDialog(false);
      setPendingData(null);
    }
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit, onError)}
        className={className}
      >
        {children}
      </form>

      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{confirmTitle}</DialogTitle>
            <DialogDescription>
              {confirmDescription}
              <div className="mt-2">
                <p className="text-sm font-medium">
                  Required tokens: {requiredTokens}
                </p>
                <p className="text-sm font-medium">
                  Current balance: {balance}
                </p>
                <p className="text-sm font-medium">
                  Remaining after submission: {balance - requiredTokens}
                </p>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowConfirmDialog(false)}
              disabled={isActionPending}
            >
              Cancel
            </Button>
            <Button onClick={handleConfirm} disabled={isActionPending}>
              {isActionPending ? (
                <>
                  <div className="mr-2 size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Processing...
                </>
              ) : (
                "Confirm"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </FormProvider>
  );
};
