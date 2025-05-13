import { ChatBubbleAction } from "@/components/ui/chat/chat-bubble";
import { Copy } from "lucide-react";
import { toast } from "sonner";

interface CopyMessageProps {
  text: string;
}

export default function CopyMessage({ text }: CopyMessageProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };
  return (
    <ChatBubbleAction
      className="size-6"
      icon={<Copy className="size-3" />}
      onClick={handleCopy}
    />
  );
}
