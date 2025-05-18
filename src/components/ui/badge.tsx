import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center text-center leading-none rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-[1px]",
  {
    variants: {
      variant: {
        default: "bg-primary/10 text-primary hover:bg-primary/20",
        secondary:
          "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100",
        destructive:
          "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-200",
        success:
          "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-200",
        warning:
          "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-200",
        info: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-200",
        outline: "border border-border bg-transparent text-foreground/80",
        academic:
          "bg-sky-100 text-sky-700 dark:bg-sky-900/50 dark:text-sky-200",
        reading:
          "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-200",
        course:
          "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-200",
        published:
          "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
