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
import { useState, createContext, useContext, ReactNode } from "react";

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
}

export default function AppConfirmDialog({
  isOpen,
  onClose,
  onSubmit,
  title,
  description,
  confirmText = "Xác nhận",
  cancelText = "Hủy",
}: ConfirmDialogProps) {
  const handleSubmit = () => {
    onSubmit();
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
          <Button variant="outline" onClick={onClose}>
            {cancelText}
          </Button>
          <Button onClick={handleSubmit}>{confirmText}</Button>
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

  const openConfirmDialog = (newOptions: ConfirmDialogOptions) => {
    setOptions(newOptions);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleConfirm = () => {
    if (options?.onConfirm) {
      options.onConfirm();
    }
    setIsOpen(false);
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
