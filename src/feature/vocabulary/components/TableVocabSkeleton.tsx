import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function TableVocabSkeleton() {
  return (
    <Card className="w-full">
      <div className="rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell className="w-12">
                <Skeleton className="size-4" />
              </TableCell>
              <TableCell className="w-1/4 font-medium">TERM</TableCell>
              <TableCell className="w-1/3 font-medium">MEANING</TableCell>
              <TableCell className="w-1/4 font-medium">SOURCE TEXT</TableCell>
              <TableCell className="w-1/6 font-medium">STATUS</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[1, 2, 3, 4, 5].map((i) => (
              <TableRow key={i}>
                <TableCell className="w-12">
                  <Skeleton className="size-4" />
                </TableCell>
                <TableCell>
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-32" />
                    <div className="flex gap-1">
                      <Skeleton className="h-5 w-16" />
                      <Skeleton className="h-5 w-16" />
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-2">
                    <Skeleton className="h-20 w-32 rounded" />
                    <div className="space-y-1">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Skeleton className="h-16 w-full" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-8 w-24" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
