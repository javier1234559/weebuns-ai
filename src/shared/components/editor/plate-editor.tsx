'use client';

import React, { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { Plate, PlateEditor as PlateEditorType } from '@udecode/plate/react';

import { useCreateEditor } from '@/shared/components/editor/use-create-editor';
import { SettingsDialog } from '@/shared/components/editor/settings';
import { Editor, EditorContainer } from '@/shared/components/plate-ui/editor';
import { Value } from '@udecode/plate';

interface PlateEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function PlateEditor({ value, onChange }: PlateEditorProps) {
  const editor: PlateEditorType = useCreateEditor();
  const [editorValue, setEditorValue] = useState<string>(value);

  useEffect(() => {
    if (editor && value !== editorValue) {
      setEditorValue(value);
    }
  }, [value, editor, editorValue]);

  const handleChange = (options: { editor: PlateEditorType; value: Value }) => {
    const serialized = JSON.stringify(options.value);
    setEditorValue(serialized);
    onChange(serialized);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Plate
        editor={editor}
        onChange={handleChange}
      >
        <EditorContainer>
          <Editor variant='fullWidth' />
        </EditorContainer>
        <SettingsDialog />
      </Plate>
    </DndProvider>
  );
}
