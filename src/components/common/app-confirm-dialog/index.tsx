"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { useState, createContext, useContext, ReactNode } from "react";

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => Promise<void>;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
}

export default function AppConfirmDialog({
  isOpen,
  onClose,
  onSubmit,
  title,
  description,
  confirmText = "Xác nhận",
  cancelText = "Hủy",
  isLoading = false,
}: ConfirmDialogProps) {
  const handleSubmit = async () => {
    await onSubmit();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            {cancelText}
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="size-2 animate-spin" />
            ) : (
              confirmText
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Context for managing dialog state
interface ConfirmDialogContextType {
  openConfirmDialog: (options: ConfirmDialogOptions) => void;
}

interface ConfirmDialogOptions {
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
}

const ConfirmDialogContext = createContext<
  ConfirmDialogContextType | undefined
>(undefined);

export function ConfirmDialogProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<ConfirmDialogOptions | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const openConfirmDialog = (newOptions: ConfirmDialogOptions) => {
    setOptions(newOptions);
    setIsOpen(true);
  };

  const handleClose = () => {
    if (isLoading) return;
    setIsOpen(false);
    setIsLoading(false);
  };

  const handleConfirm = async () => {
    if (!options?.onConfirm) return;
    try {
      setIsLoading(true);
      await options.onConfirm();
      console.log("isLoading", isLoading);
      setIsOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ConfirmDialogContext.Provider value={{ openConfirmDialog }}>
      {children}
      {options && (
        <AppConfirmDialog
          isOpen={isOpen}
          onClose={handleClose}
          onSubmit={handleConfirm}
          title={options.title}
          description={options.description}
          confirmText={options.confirmText}
          cancelText={options.cancelText}
          isLoading={isLoading}
        />
      )}
    </ConfirmDialogContext.Provider>
  );
}

export function useConfirmDialog() {
  const context = useContext(ConfirmDialogContext);
  if (!context) {
    throw new Error(
      "useConfirmDialog must be used within a ConfirmDialogProvider",
    );
  }
  return context;
}
