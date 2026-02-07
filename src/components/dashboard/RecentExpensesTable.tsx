"use client";

import { RECENT_TRANSACTIONS } from "@/lib/data";
import { MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";

export default function RecentExpensesTable() {
  return (
    <Card className="col-span-full">
      <CardContent className="p-0">
        <div className="p-6 flex items-center justify-between border-b border-border">
          <div>
            <h3 className="text-lg font-medium">Recent Transactions</h3>
            <p className="text-sm text-muted-foreground">
              Latest 5 financial records
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Note</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {RECENT_TRANSACTIONS.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="text-muted-foreground">
                    {item.date}
                  </TableCell>
                  <TableCell className="font-medium">{item.category}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {item.note}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        item.status === "Completed"
                          ? "default"
                          : item.status === "Pending"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {item.amount}
                  </TableCell>
                  <TableCell className="text-right">
                    <button className="p-2 hover:bg-muted rounded-full text-muted-foreground hover:text-foreground">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
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
