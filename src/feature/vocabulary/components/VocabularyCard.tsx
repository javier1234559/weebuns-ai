import React, { memo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { VocabData } from "../data";

const VocabularyCard = ({ data }: { data: VocabData }) => {
  return (
    <Card className="p-1 shadow-none  ">
      <CardContent className="h-full space-y-4 p-0 ">
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-bold text-foreground">
                {data.value}
              </h3>
              <p className="text-sm text-muted-foreground">{data.ipa}</p>
            </div>
            <span className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">
              {data.word_class}
            </span>
          </div>
          <p className="text-base text-foreground">{data.meaning}</p>
        </div>

        <Separator />

        <div className="space-y-3">
          <div>
            <h4 className="mb-1 text-sm font-semibold text-foreground">
              Explanation
            </h4>
            <p className="text-sm text-muted-foreground">{data.explanation}</p>
          </div>

          <div>
            <h4 className="mb-1 text-sm font-semibold text-foreground">
              Collocation
            </h4>
            <p className="text-sm text-muted-foreground">{data.collocation}</p>
          </div>

          <div>
            <h4 className="mb-1 text-sm font-semibold text-foreground">
              Examples
            </h4>
            <ul className="space-y-2">
              {data.example.map((ex, idx) => (
                <li key={idx} className="text-sm text-muted-foreground">
                  {ex}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-foreground">Context</h4>
          <p className="text-sm text-muted-foreground">{data.parent.value}</p>
          <p className="text-sm text-muted-foreground">{data.parent.meaning}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default memo(VocabularyCard);
