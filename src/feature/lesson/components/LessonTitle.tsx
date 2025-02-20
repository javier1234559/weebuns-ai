"use client";

import { InfoIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface LessonTitleProps {
  title: string;
  type: string;
  description: string;
  tooltipContent?: React.ReactNode;
}

export function LessonTitle({
  title,
  type,
  description,
  tooltipContent,
}: LessonTitleProps) {
  return (
    <div className="space-y-4">
      <div>
        {/* Title and Icon */}
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-semibold">{type}</h2>
          {tooltipContent && (
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <InfoIcon className="size-5 cursor-pointer text-muted-foreground hover:text-foreground" />
                </TooltipTrigger>
                <TooltipContent className="max-w-sm p-4" align="start">
                  {tooltipContent}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>

        {/* Subtitle */}
        <div className="mt-2 text-3xl font-medium text-primary">{title}</div>
      </div>

      {/* Description */}
      <div className="whitespace-pre-line text-muted-foreground">
        {description}
      </div>
    </div>
  );
}
