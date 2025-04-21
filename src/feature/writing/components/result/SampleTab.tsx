import { Card, CardContent } from "@/components/ui/card";

interface SampleTabProps {
  data: string;
}

export function SampleTab({ data }: SampleTabProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div
          className="content-editor"
          dangerouslySetInnerHTML={{ __html: data }}
        />
      </CardContent>
    </Card>
  );
}
