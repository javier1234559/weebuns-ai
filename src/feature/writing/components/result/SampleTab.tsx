import { Card, CardContent } from "@/components/ui/card";
import { SampleEssayDTO } from "@/services/swagger-types";

interface SampleTabProps {
  data: SampleEssayDTO;
}

export function SampleTab({ data }: SampleTabProps) {
  const formattedContent = `
    <h3 class="text-lg font-semibold mb-4">Introduction</h3>
    <div class="mb-6">${data.instruction}</div>

    <h3 class="text-lg font-semibold mb-4">Body Paragraph 1</h3>
    <div class="mb-6">${data.body1}</div>

    <h3 class="text-lg font-semibold mb-4">Body Paragraph 2</h3>
    <div class="mb-6">${data.body2}</div>

    <h3 class="text-lg font-semibold mb-4">Conclusion</h3>
    <div class="mb-6">${data.conclusion}</div>
  `;

  return (
    <Card>
      <CardContent className="p-6">
        <div
          className="prose prose-sm max-w-none dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: formattedContent }}
        />
      </CardContent>
    </Card>
  );
}
