import { Card, CardContent } from "@/components/ui/card";
import { UserDataDTO } from "@/feature/writing/schema";

interface OriginalTabProps {
  data?: UserDataDTO;
}

export function OriginalTab({ data }: OriginalTabProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div
          className="content-editor"
          dangerouslySetInnerHTML={{ __html: data?.body1 || "" }}
        />
      </CardContent>
    </Card>
  );
}
