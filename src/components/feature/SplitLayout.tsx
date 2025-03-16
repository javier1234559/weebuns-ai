"use client";

import { cn } from "@/lib/utils";
import { useState, useRef, useEffect, useCallback, ReactNode } from "react";

const MIN_SIZE = 10;
const MAX_SIZE = 90;
const DEFAULT_SIZE = 50;

interface ResizerProps {
  direction: "vertical" | "horizontal";
  onMouseDown: () => void;
}

export function Resizer({ direction, onMouseDown }: ResizerProps) {
  const isVertical = direction === "vertical";
  return (
    <div
      className={`${
        isVertical ? "cursor-ew-resize" : "cursor-ns-resize"
      } relative flex items-center justify-center`}
      style={{ [isVertical ? "width" : "height"]: "4px" }}
      onMouseDown={onMouseDown}
    >
      <div
        className={cn(
          "absolute -translate-y-1/2 bg-muted-foreground",
          isVertical ? "left-1/2 h-[100px] w-px" : "top-1/2 h-px w-[100px]",
        )}
      />
    </div>
  );
}

interface PaneProps {
  children: ReactNode;
  className?: string;
}

export function Pane({ children, className }: PaneProps) {
  return (
    <div className={`size-full overflow-auto ${className}`}>{children}</div>
  );
}

interface SplitPaneProps {
  children: ReactNode[];
  direction?: "vertical" | "horizontal";
  minSize?: number;
  maxSize?: number;
  defaultSize?: number;
}

export function SplitPane({
  children,
  direction = "vertical",
  minSize = MIN_SIZE,
  maxSize = MAX_SIZE,
  defaultSize = DEFAULT_SIZE,
}: SplitPaneProps) {
  const [size, setSize] = useState(defaultSize);
  const isDragging = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const isVertical = direction === "vertical";

  const handleMouseDown = useCallback(() => {
    isDragging.current = true;
    document.body.style.cursor = isVertical ? "ew-resize" : "ns-resize";
    document.body.style.userSelect = "none";
  }, [isVertical]);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
    document.body.style.cursor = "default";
    document.body.style.userSelect = "auto";
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging.current || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const newSize = isVertical
        ? ((e.clientX - rect.left) / rect.width) * 100
        : ((e.clientY - rect.top) / rect.height) * 100;

      setSize(Math.min(Math.max(newSize, minSize), maxSize));
    },
    [isVertical, minSize, maxSize],
  );

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return (
    <div
      ref={containerRef}
      className={`flex size-full ${isVertical ? "flex-row" : "flex-col"} `}
    >
      {/* First Pane */}
      <div
        className="size-full"
        style={{ [isVertical ? "width" : "height"]: `${size}%` }}
      >
        {children[0]}
      </div>

      {/* Resizer (Composed Component) */}
      <Resizer direction={direction} onMouseDown={handleMouseDown} />

      {/* Second Pane */}
      <div
        className="size-full"
        style={{ [isVertical ? "width" : "height"]: `${100 - size}%` }}
      >
        {children[1]}
      </div>
    </div>
  );
}
