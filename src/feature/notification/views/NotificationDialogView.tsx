import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import NotificationViewList from "./NotificationViewList";

interface NotificationDialogViewProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificationDialogView({
  isOpen,
  onClose,
}: NotificationDialogViewProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Trung tâm thông báo</DialogTitle>
        </DialogHeader>
        <NotificationViewList isOpen={isOpen} />
      </DialogContent>
    </Dialog>
  );
}