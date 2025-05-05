import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function HistoryTransactionTableSkeleton() {
  return (
    <Card className="w-full">
      <div className="rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell className="w-1/4 font-medium">
                TRANSACTION ID
              </TableCell>
              <TableCell className="w-1/6 font-medium">AMOUNT</TableCell>
              <TableCell className="w-1/6 font-medium">TOKENS</TableCell>
              <TableCell className="w-1/6 font-medium">PAYMENT TYPE</TableCell>
              <TableCell className="w-1/6 font-medium">STATUS</TableCell>
              <TableCell className="w-1/4 font-medium">DATE</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[1, 2, 3, 4, 5].map((i) => (
              <TableRow key={i}>
                <TableCell>
                  <Skeleton className="h-5 w-32" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-24" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-20" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-16" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-20" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-32" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
