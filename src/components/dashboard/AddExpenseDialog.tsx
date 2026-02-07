"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export default function AddExpenseDialog() {
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState("");

  const handleSave = () => {
    console.log("Saving Expense:", { amount, note, date });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="shadow-lg shadow-blue-900/20">
          <Plus className="mr-2 h-4 w-4" />
          Add Expense
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Expense</DialogTitle>
          <DialogDescription>
            Enter your transaction details below.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <Input
            placeholder="Note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />

          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <Button onClick={handleSave} className="w-full">
            Save Expense
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
