import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import LevelButtons from "./LevelButton";
import { Vocabulary } from "@/feature/vocabulary/types/vocabulary";

interface TableVocabProps {
  vocabularies: Vocabulary[];
}

export default function TableVocab({ vocabularies }: TableVocabProps) {
  const selectedVocabs = [] as Vocabulary[];
  const selected = selectedVocabs.map((vocab: Vocabulary) => vocab.id);

  console.log(vocabularies);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      // dispatch(setSelectedVocabs(vocabularies));
    } else {
      // dispatch(setSelectedVocabs([]));
    }
  };

  const handleSelect = (vocab: Vocabulary) => {
    const selectedIndex = selected.indexOf(vocab.id);
    let newSelectedVocabs: Vocabulary[] = [];

    if (selectedIndex === -1) {
      newSelectedVocabs = [...selectedVocabs, vocab];
    } else {
      newSelectedVocabs = selectedVocabs.filter(
        (v: Vocabulary) => v.id !== vocab.id,
      );
    }

    // dispatch(setSelectedVocabs(newSelectedVocabs));
  };

  return (
    <Card className="w-full">
      <div className="rounded-md border">
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
                TERM ({vocabularies.length})
              </TableCell>
              <TableCell className="w-1/3 font-medium">MEANING</TableCell>
              <TableCell className="w-1/4 font-medium">SOURCE TEXT</TableCell>
              <TableCell className="w-1/6 font-medium">STATUS</TableCell>
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
                    <div className="flex flex-wrap gap-1">
                      {Array.isArray(vocab.tags) &&
                        vocab.tags.map((tag: string) => (
                          <Badge key={tag} variant="outline">
                            {tag}
                          </Badge>
                        ))}
                    </div>
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
