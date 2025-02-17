import { Button } from "@/components/ui/button";
import { ClipboardList } from "lucide-react";

interface EmptyStateProps {
  description: string;
  onAction: () => void;
  actionText: string;
}

const EmptyState = ({ description, onAction, actionText }: EmptyStateProps) => (
  <div className="flex flex-col items-center justify-center py-12">
    <ClipboardList className="mb-6 size-10 text-muted-foreground" />
    <p className="mb-4 max-w-xs text-center text-muted-foreground">
      {description}
    </p>
    <Button onClick={onAction}>{actionText}</Button>
  </div>
);

export default EmptyState;
