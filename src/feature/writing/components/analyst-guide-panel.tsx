interface AnalysisGuidePanelProps {
  analysis_guide: string;
}

export function AnalysisGuidePanel({
  analysis_guide,
}: AnalysisGuidePanelProps) {
  return (
    <div className="space-y-4">
      <div
        className=" flex flex-col gap-4 overflow-y-auto bg-background p-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-400 hover:scrollbar-thumb-gray-300"
        style={{ height: "1000px" }}
      >
        <div
          className="content-editor prose max-w-none"
          dangerouslySetInnerHTML={{ __html: analysis_guide }}
        />
      </div>
    </div>
  );
}
