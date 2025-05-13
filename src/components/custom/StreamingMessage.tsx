import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "@/components/ui/chat/chat-bubble";
import { simpleInlineMarkdownToHtml } from "@/lib/text";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface StreamingMessageProps {
  parts: string[];
  onComplete: () => void;
}

export default function StreamingMessage({
  parts,
  onComplete,
}: StreamingMessageProps) {
  const [currentParts, setCurrentParts] = useState<string[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (parts.length > 0) {
      setCurrentParts(parts);
      setIsAnimating(true);
    }
  }, [parts]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
  };

  if (!isAnimating || currentParts.length === 0) {
    return null;
  }

  return (
    <ChatBubble variant="received">
      <ChatBubbleAvatar fallback="AI" />
      <ChatBubbleMessage className="w-1/2">
        <motion.div
          className="whitespace-pre-line break-words"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          onAnimationComplete={() => {
            console.log("Container animation complete");
            setIsAnimating(false);
            onComplete();
          }}
        >
          {currentParts.map((part, idx) => (
            <motion.span
              key={idx}
              variants={itemVariants}
              onAnimationComplete={() => {
                console.log(`Part ${idx} animation complete`);
              }}
            >
              <span
                dangerouslySetInnerHTML={{
                  __html: simpleInlineMarkdownToHtml(part),
                }}
              />
            </motion.span>
          ))}
        </motion.div>
      </ChatBubbleMessage>
    </ChatBubble>
  );
}
