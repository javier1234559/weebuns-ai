import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Transaction } from "@/services/swagger-types";
import { cn } from "@/lib/utils";

interface HistoryTransactionTableProps {
  transactions: Transaction[];
}

export default function HistoryTransactionTable({
  transactions,
}: HistoryTransactionTableProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-success/10 text-success border-success/20 hover:bg-success/20";
      case "pending":
        return "bg-warning/10 text-warning border-warning/20 hover:bg-warning/20";
      case "failed":
        return "bg-error/10 text-error border-error/20 hover:bg-error/20";
      default:
        return "bg-muted text-muted-foreground border-muted-foreground/20 hover:bg-muted-foreground/20";
    }
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: currency,
    }).format(amount);
  };

  return (
    <Card>
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
              {transactions.map((transaction) => (
                <TableRow key={transaction.id} className="hover:bg-muted/50">
                  <TableCell className="px-6 py-4">
                    <p className="font-medium text-foreground">
                      {transaction.transactionId}
                    </p>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <p className="font-medium text-foreground">
                      {formatCurrency(transaction.amount, transaction.currency)}
                    </p>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <p className="font-medium text-foreground">
                      {transaction.tokenAmount} tokens
                    </p>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <p className="font-medium capitalize text-foreground">
                      {transaction.paymentType}
                    </p>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <Badge
                      variant="outline"
                      className={cn(
                        "px-3 py-1.5 font-medium transition-colors",
                        getStatusColor(transaction.status),
                      )}
                    >
                      {transaction.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <p className="text-sm text-muted-foreground">
                      {format(
                        new Date(transaction.paymentDate),
                        "dd/MM/yyyy HH:mm",
                      )}
                    </p>
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
