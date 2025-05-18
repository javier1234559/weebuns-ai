import { Card, CardContent } from "@/components/ui/card";

interface OriginalTabProps {
  data?: string;
}

export function OriginalTab({ data }: OriginalTabProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div
          className="content-editor"
          dangerouslySetInnerHTML={{ __html: data || "" }}
        />
      </CardContent>
    </Card>
  );
}
