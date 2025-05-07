import { useState } from "react";
import { VocabularyItemDTO } from "@/services/swagger-types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import Image from "next/image";

interface VocabularyPanelProps {
  vocabulary_list: VocabularyItemDTO[];
}

export function VocabularyPanel({ vocabulary_list }: VocabularyPanelProps) {
  const [count, setCount] = useState(5);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Vocabulary List</h3>
        <Select
          value={count.toString()}
          onValueChange={(value) => setCount(Number.parseInt(value))}
        >
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Count" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="15">15</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div
        className="thin-scrollbar flex flex-col gap-2 overflow-y-auto bg-background p-4"
        style={{ height: "1000px" }}
      >
        {vocabulary_list.slice(0, count).map((item, index) => (
          <Card key={index} className="mb-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{item.term}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <h4 className="text-sm font-medium">Meanings:</h4>
                  <ul className="list-disc pl-5">
                    {item.meaning.map((meaning, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground">
                        {meaning}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-medium">Example:</h4>
                  <p className="text-sm italic text-muted-foreground">
                    {item.example_sentence}
                  </p>
                </div>

                {item.image_url && (
                  <div className="mt-2">
                    <Image
                      src={item.image_url}
                      alt={`Image for ${item.term}`}
                      width={100}
                      height={100}
                      className="max-h-40 rounded-md object-cover"
                    />
                  </div>
                )}

                <div className="flex flex-wrap gap-1">
                  {item.tags.map((tag, idx) => (
                    <Badge key={idx} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {item.reference_link && (
                  <div className="mt-2">
                    <a
                      href={item.reference_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-xs text-blue-500 hover:underline"
                    >
                      {item.reference_name || "Reference"}{" "}
                      <ExternalLink className="ml-1 size-3" />
                    </a>
                  </div>
                )}

                <div className="mt-2 text-xs text-muted-foreground">
                  Repetition Level: {item.repetition_level}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
