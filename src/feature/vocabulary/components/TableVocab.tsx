import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import LevelButtons from "./LevelButton";
import { Vocabulary } from "@/services/swagger-types";
import { useVocabStore } from "@/feature/vocabulary/store/vocabStore";

interface TableVocabProps {
  vocabularies: Vocabulary[];
}

export default function TableVocab({ vocabularies }: TableVocabProps) {
  const { checkedVocabs, toggleVocab, toggleAllVocabs } = useVocabStore();
  const selected = checkedVocabs.map((vocab) => vocab.id);

  const handleSelectAll = (checked: boolean) => {
    toggleAllVocabs(vocabularies, checked);
  };

  const handleSelect = (vocab: Vocabulary) => {
    toggleVocab(vocab);
  };

  return (
    <Card className="w-full">
      <div className="rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell className="w-12">
                <Checkbox
                  checked={selected.length === vocabularies.length}
                  onCheckedChange={handleSelectAll}
                />
              </TableCell>
              <TableCell className="w-1/4 font-medium">
                Từ vựng ({vocabularies.length})
              </TableCell>
              <TableCell className="w-1/3 font-medium">Nghĩa</TableCell>
              <TableCell className="w-1/4 font-medium">Ví dụ</TableCell>
              <TableCell className="w-1/6 font-medium">
                Mức độ quen thuộc
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vocabularies.map((vocab) => (
              <TableRow key={vocab.id} className="hover:bg-muted/50">
                <TableCell className="w-12">
                  <Checkbox
                    checked={selected.includes(vocab.id)}
                    onCheckedChange={() => handleSelect(vocab)}
                  />
                </TableCell>
                <TableCell>
                  <div className="space-y-2">
                    <p className="font-medium">{vocab.term}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-2">
                    {vocab.imageUrl && (
                      <Image
                        src={vocab.imageUrl}
                        alt={vocab.term}
                        className="h-20 w-auto rounded object-cover"
                        width={80}
                        height={80}
                      />
                    )}
                    {vocab.meaning.map((mean: string, index: number) => (
                      <p key={index} className="text-sm">
                        • {mean}
                      </p>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <p className="line-clamp-3 min-w-[150px] text-sm italic">
                    &quot;{vocab.exampleSentence}&quot;
                  </p>
                </TableCell>
                <TableCell>
                  <div className="whitespace-nowrap">
                    <LevelButtons id={vocab.id} level={vocab.repetitionLevel} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
