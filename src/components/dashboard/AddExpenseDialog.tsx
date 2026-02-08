"use client";

import { useEffect, useState } from "react";
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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";

type Category = {
  _id: string;
  name: string;
};

export default function AddExpenseDialog({onExpenseAdded}: any) {
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState("");

  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryId, setCategoryId] = useState("");

  const [loadingCategories, setLoadingCategories] = useState(false);

  const [expenses, setExpenses] = useState<any[]>([]);

  const fetchAllExpense = async () => {
    try {
      const result = await axios.get("/api/expenses");
      console.log("fetchAllExpense", result.data.expenses);
      setExpenses(result.data.expenses);
    } catch (error) {
      console.log("Fetch all expense error", error);
    }
  };
  // fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);

        const result = await axios.get("/api/categories");

        console.log("dashboard categories", result.data.allCategory);
        setCategories(result.data.allCategory || []);
        if (result.data.allCategory?.length > 0) {
          setCategoryId(result.data.allCategory[0]._id);
        }
      } catch (error) {
        console.log("Categories fetch error:", error);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
    onExpenseAdded()
  }, []);

  const handleSave = async () => {
    if (!amount || !date || !categoryId) {
      alert("Amount, date and category are required!");
      return;
    }

    const payload = {
      amount: Number(amount),
      note,
      date,
      categoryId,
    };

    console.log("Saving Expense:", payload);

    const res = await fetch("/api/expenses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Expense saved successfully!");
      setAmount("");
      setNote("");
      setDate("");
      fetchAllExpense();
      onExpenseAdded(); 
    } else {
      alert(data.message || "Expense save failed");
    }
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
            Select category and enter your expense details.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Amount */}
          <Input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          {/* Category Dropdown */}
          <Select value={categoryId} onValueChange={setCategoryId}>
            <SelectTrigger className="w-full">
              <SelectValue
                placeholder={
                  loadingCategories
                    ? "Loading categories..."
                    : "Select category"
                }
              />
            </SelectTrigger>

            <SelectContent className="w-full">
              {categories.map((cat) => (
                <SelectItem key={cat._id} value={cat._id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Note */}
          <Input
            placeholder="Note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />

          {/* Date */}
          <Input
            type="date"
            value={date}
            max={new Date().toISOString().split("T")[0]}
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
