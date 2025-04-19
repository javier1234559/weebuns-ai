import { Button } from "@/components/ui/button";
import { Editor } from "@tiptap/react";
import {
  Undo2,
  Redo2,
  Heading1,
  Heading2,
  Heading3,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Minus,
  Plus,
  Text as TextIcon,
} from "lucide-react";
import { useState } from "react";

export default function Toolbar({ editor }: { editor: Editor }) {
  const [fontSize, setFontSize] = useState(16);

  const handleFontSizeChange = (delta: number) => {
    const newSize = fontSize + delta;
    if (newSize >= 8 && newSize <= 30) {
      setFontSize(newSize);
      const element = editor?.view.dom as HTMLElement;
      if (element) {
        element.style.setProperty("--content-font-size", `${newSize}px`);
      }
    }
  };

  return (
    <div className="flex items-center gap-1 p-1">
      {/* Undo/Redo */}
      <div className="flex items-center gap-0.5">
        <Button
          variant="ghost"
          size="icon"
          type="button"
          onClick={() => editor?.chain().focus().undo().run()}
          disabled={!editor?.can().undo()}
        >
          <Undo2 className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          type="button"
          onClick={() => editor?.chain().focus().redo().run()}
          disabled={!editor?.can().redo()}
        >
          <Redo2 className="h-4 w-4" />
        </Button>
      </div>
      <div className="w-px h-6 bg-border mx-1" /> {/* Divider */}
      {/* Text Style */}
      <div className="flex items-center gap-0.5">
        <Button
          variant="ghost"
          size="icon"
          type="button"
          onClick={() => editor?.chain().focus().setParagraph().run()}
          className={editor?.isActive("paragraph") ? "bg-accent" : ""}
        >
          <TextIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          type="button"
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor?.isActive("heading", { level: 1 }) ? "bg-accent" : ""
          }
        >
          <Heading1 className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          type="button"
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor?.isActive("heading", { level: 2 }) ? "bg-accent" : ""
          }
        >
          <Heading2 className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          type="button"
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor?.isActive("heading", { level: 3 }) ? "bg-accent" : ""
          }
        >
          <Heading3 className="h-4 w-4" />
        </Button>
      </div>
      <div className="w-px h-6 bg-border mx-1" /> {/* Divider */}
      {/* Font Size */}
      <div className="flex items-center gap-0.5">
        <Button
          variant="ghost"
          size="icon"
          type="button"
          onClick={() => handleFontSizeChange(-1)}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="w-8 text-center text-sm">{fontSize}</span>
        <Button
          variant="ghost"
          size="icon"
          type="button"
          onClick={() => handleFontSizeChange(1)}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="w-px h-6 bg-border mx-1" /> {/* Divider */}
      {/* Text Formatting */}
      <div className="flex items-center gap-0.5">
        <Button
          variant="ghost"
          size="icon"
          type="button"
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className={editor?.isActive("bold") ? "bg-accent" : ""}
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          type="button"
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          className={editor?.isActive("italic") ? "bg-accent" : ""}
        >
          <Italic className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
