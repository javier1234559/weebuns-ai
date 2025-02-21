// components/loaders/CatLoading.tsx
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface AppLoadingProps {
  className?: string;
}

const CatSvg = ({ delay = 0 }: { delay?: number }) => (
  <motion.div
    initial={{ x: -100, opacity: 0 }}
    animate={{
      x: [null, 100],
      opacity: [0, 1, 1, 0],
    }}
    transition={{
      x: {
        duration: 3,
        repeat: Infinity,
        ease: "linear",
        delay,
      },
      opacity: {
        duration: 3,
        repeat: Infinity,
        ease: "linear",
        delay,
        times: [0, 0.1, 0.8, 1],
      },
    }}
    className="absolute"
  >
    <motion.svg
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      animate={{
        y: [-4, 0],
      }}
      transition={{
        y: {
          duration: 0.5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        },
      }}
    >
      {/* Body */}
      <path
        d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4Z"
        className="text-foreground"
        fill="currentColor"
      />
      {/* Bigger Ears */}
      <path
        d="M7 6L11.5 10.5M17 6L12.5 10.5" // Giữ độ cao như cũ nhưng vẫn giữ độ nhọn
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Small triangular fills for ears */}
      <path
        d="M7 6L9 8L11.5 10.5L9 8Z" // Điều chỉnh điểm giữa để tạo góc nhọn hơn
        className="text-foreground"
        fill="currentColor"
      />
      <path
        d="M17 6L15 8L12.5 10.5L15 8Z" // Điều chỉnh điểm giữa để tạo góc nhọn hơn
        className="text-foreground"
        fill="currentColor"
      />
      {/* Eyes */}
      <motion.circle
        cx="9"
        cy="12"
        r="1"
        className="fill-background"
        animate={{
          scaleY: [1, 0.1, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          times: [0, 0.95, 1],
        }}
      />
      <motion.circle
        cx="15"
        cy="12"
        r="1"
        className="fill-background"
        animate={{
          scaleY: [1, 0.1, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          times: [0, 0.95, 1],
        }}
      />
      {/* Tail */}
      <motion.path
        d="M18 12C18 12 20 14 20 16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        animate={{
          rotate: [-10, 10],
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        style={{ originX: "18px", originY: "12px" }}
      />
    </motion.svg>
  </motion.div>
);

export default function AppLoading({ className }: AppLoadingProps) {
  return (
    <div
      className={cn(
        "flex h-48 w-full items-center justify-center overflow-hidden",
        className,
      )}
    >
      <div className="relative w-[300px]">
        {/* Track line */}
        <div className="absolute -bottom-4 h-1 w-full rounded-full" />
        {/* Three cats with different delays */}
        <div className="flex justify-center">
          <CatSvg delay={0} />
          <CatSvg delay={1} />
          <CatSvg delay={2} />
        </div>
      </div>
    </div>
  );
}
