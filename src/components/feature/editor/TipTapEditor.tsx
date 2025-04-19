import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import Toolbar from "@/components/feature/editor/toolbar";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

interface TipTapEditorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const TipTapEditor = ({ value, onChange, className }: TipTapEditorProps) => {
  const editor = useEditor({
    extensions: [StarterKit, TextStyle],
    content: value,
    editorProps: {
      attributes: {
        class: "content-editor h-full",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  return (
    <div className={cn("flex flex-col h-full", className)}>
      <div className="border rounded-md bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        {editor && <Toolbar editor={editor} />}
      </div>
      <div className="flex-1 flex flex-col min-h-0">
        <EditorContent
          editor={editor}
          className="flex-1 overflow-y-auto border rounded-lg p-4 mt-2"
        />
      </div>
    </div>
  );
};

export default TipTapEditor;
