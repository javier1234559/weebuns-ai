"use client";

interface ReadingNotesViewProps {
  content: string;
}

export const ReadingNotesView = ({ content }: ReadingNotesViewProps) => {
  return (
    <div className="thin-scrollbar h-full overflow-y-auto rounded-md bg-background p-4">
      <div className="relative selection:bg-yellow-100 dark:selection:bg-yellow-800">
        <article
          className="content-editor text-xl"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
};

export default ReadingNotesView;
