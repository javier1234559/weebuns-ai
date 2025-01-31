"use client";

import { Toaster } from "sonner";
import { PlateEditor } from "@/components/editor/plate-editor";
import { SettingsProvider } from "@/components/editor/settings";

export default function MainEditor() {
  return (
    <div>
      <SettingsProvider>
        <PlateEditor />
      </SettingsProvider>
      <Toaster />
    </div>
  );
}
