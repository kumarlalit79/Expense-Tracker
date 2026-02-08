"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

import { Card, CardContent } from "@/components/ui/card";

export default function RecentExpensesTable({
  refreshKey,
}: {
  refreshKey: number;
}) {
  const [expenses, setExpenses] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchRecentExpenses = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/expenses/recent");
      setExpenses(res.data.expenses || []);
    } catch (error) {
      console.log("Recent expenses fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentExpenses();
  }, [refreshKey]);

  return (
    <Card className="col-span-full">
      <CardContent className="p-0">
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-medium">Recent Transactions</h3>
          <p className="text-sm text-muted-foreground">
            Latest 5 financial records
          </p>
        </div>

        <div className="overflow-x-auto">
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead className="text-center w-[80px]">Sr No</TableHead>
        <TableHead className="text-center">Date</TableHead>
        <TableHead className="text-center">Category</TableHead>
        <TableHead className="text-center">Note</TableHead>
        <TableHead className="text-center">Amount</TableHead>
      </TableRow>
    </TableHeader>

    <TableBody>
      {loading ? (
        <TableRow>
          <TableCell
            colSpan={5}
            className="text-center py-8 text-muted-foreground"
          >
            Loading...
          </TableCell>
        </TableRow>
      ) : expenses.length === 0 ? (
        <TableRow>
          <TableCell
            colSpan={5}
            className="text-center py-8 text-muted-foreground"
          >
            No transactions found
          </TableCell>
        </TableRow>
      ) : (
        expenses.map((exp, index) => (
          <TableRow key={exp._id}>
            <TableCell className="text-center text-muted-foreground">
              {index + 1}
            </TableCell>

            <TableCell className="text-center text-muted-foreground">
              {new Date(exp.date).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </TableCell>

            <TableCell className="text-center font-medium">
              {exp.categoryId?.name || "N/A"}
            </TableCell>

            <TableCell className="text-center text-muted-foreground">
              {exp.note || "-"}
            </TableCell>

            <TableCell className="text-center font-medium">
              ₹ {Number(exp.amount).toLocaleString("en-IN")}
            </TableCell>
          </TableRow>
        ))
      )}
    </TableBody>
  </Table>
</div>

      </CardContent>
    </Card>
  );
}
