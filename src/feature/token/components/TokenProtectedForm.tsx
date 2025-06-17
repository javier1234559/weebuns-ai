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
  confirmTitle = "Xác nhận thực hiện",
  confirmDescription = "Bạn có chắc chắn muốn thực hiện hành động này không? Hành động này sẽ tốn token.",
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
          title: "Không đủ token",
          description: `Bạn cần ${requiredTokens} token để thực hiện hành động này. Số token hiện có: ${balance}`,
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
        title: "Thành công",
        description: `Hành động đã hoàn thành. Số token còn lại: ${balance - requiredTokens}`,
      });
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thực hiện được hành động. Vui lòng thử lại.",
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
              <div className="mt-2 flex flex-col gap-2">
                <p className="text-sm font-medium">
                  Token cần:{" "}
                  <span className="font-bold text-primary">
                    {requiredTokens}
                  </span>
                </p>
                <p className="text-sm font-medium">
                  Token hiện có:{" "}
                  <span className="font-bold text-primary">{balance}</span>
                </p>
                <p className="text-sm font-medium">
                  Token còn lại:{" "}
                  <span className="font-bold text-primary">
                    {balance - requiredTokens}
                  </span>
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
              Hủy
            </Button>
            <Button onClick={handleConfirm} disabled={isActionPending}>
              {isActionPending ? (
                <>
                  <div className="mr-2 size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Đang xử lý...
                </>
              ) : (
                "Xác nhận"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </FormProvider>
  );
};
