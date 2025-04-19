"use client";

import { Toaster } from "sonner";
import { PlateEditor } from "@/components/editor/plate-editor";
import { SettingsProvider } from "@/components/editor/settings";
import { cn } from "@/lib/utils";

interface MainEditorProps {
  className?: string;
  value: string;
  onChange: (value: string) => void;
}

export default function MainEditor({
  className,
  value,
  onChange,
}: MainEditorProps) {
  return (
    <div className={cn("size-full", className)}>
      <SettingsProvider>
        <PlateEditor value={value} onChange={onChange} />
      </SettingsProvider>
      <Toaster />
    </div>
  );
}
