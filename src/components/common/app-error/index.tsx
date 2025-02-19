import { Alert, AlertDescription } from "@/components/ui/alert";

interface AppErrorProps {
  error: any;
  message?: string;
  className?: string;
}

export default function AppError({ error, message, className }: AppErrorProps) {
  return (
    <Alert variant="destructive" className={className}>
      <AlertDescription>
        {error?.message || message || "Failed to load data"}
      </AlertDescription>
    </Alert>
  );
}
