import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
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
      <CardHeader>
        <CardTitle>Lịch sử giao dịch</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableCell className="w-1/4 px-6 py-4 font-bold">
                  TRANSACTION ID
                </TableCell>
                <TableCell className="w-1/6 px-6 py-4 font-bold ">
                  AMOUNT
                </TableCell>
                <TableCell className="w-1/6 px-6 py-4 font-bold ">
                  TOKENS
                </TableCell>
                <TableCell className="w-1/6 px-6 py-4 font-bold ">
                  PAYMENT TYPE
                </TableCell>
                <TableCell className="w-1/6 px-6 py-4 font-bold ">
                  STATUS
                </TableCell>
                <TableCell className="w-1/4 px-6 py-4 font-bold ">
                  DATE
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[1, 2, 3, 4, 5].map((i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Skeleton className="h-4 w-32" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-20" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-20" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-20 rounded-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-28" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
