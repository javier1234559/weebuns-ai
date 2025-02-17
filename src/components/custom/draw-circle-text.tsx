"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface DrawCircleTextProps {
  text: string;
  circleText: string;
  circleTextClassName?: string;
  className?: string;
}

export const DrawCircleText = ({
  text,
  circleText,
  className,
  circleTextClassName,
}: DrawCircleTextProps) => {
  const wrapTextWithCircle = (content: string, textToWrap: string) => {
    if (!textToWrap) return content;

    const parts = content.split(textToWrap);
    if (parts.length === 1) return content;

    return (
      <>
        {parts[0]}
        <span className={cn("relative", circleTextClassName)}>
          {textToWrap}
          <svg
            viewBox="0 0 286 73"
            fill="none"
            className="absolute -left-2 -right-2 top-[-0.5rem] bottom-0 translate-y-1"
          >
            <motion.path
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{
                duration: 1.25,
                ease: "easeInOut",
              }}
              d="M142.293 1C106.854 16.8908 6.08202 7.17705 1.23654 43.3756C-2.10604 68.3466 29.5633 73.2652 122.688 71.7518C215.814 70.2384 316.298 70.689 275.761 38.0785C230.14 1.37835 97.0503 24.4575 52.9384 1"
              stroke="#FACC15"
              strokeWidth="3"
            />
          </svg>
        </span>
        {parts[1]}
      </>
    );
  };

  return (
    <h1
      className={cn("max-w-2xl text-center text-5xl leading-snug", className)}
    >
      {wrapTextWithCircle(text, circleText)}
    </h1>
  );
};
