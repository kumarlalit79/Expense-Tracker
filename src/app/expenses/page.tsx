"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";

import { MoreHorizontal, Plus } from "lucide-react";

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
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ExpensesPage() {
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState("");

  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryId, setCategoryId] = useState("");

  const [expenses, setExpenses] = useState<any[]>([]);

  const [loadingCategories, setLoadingCategories] = useState(false);

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
    fetchAllExpense();
  }, []);

  const fetchAllExpense = async () => {
    try {
      const result = await axios.get("/api/expenses");
      console.log("fetchAllExpense", result.data.expenses);
      setExpenses(result.data.expenses);
    } catch (error) {
      console.log("Fetch all expense error", error);
    }
  };

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
    } else {
      alert(data.message || "Expense save failed");
    }
  };

  const totalAmount = expenses.reduce(
    (sum, exp) => sum + Number(exp.amount),
    0,
  );

  return (
    <div className="flex h-screen w-full bg-background text-foreground">
      <Sidebar />

      <div className="flex flex-col flex-1 h-full md:pl-64">
        <Topbar title="Expenses" />

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {/* Header Row */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">Expenses Page</h2>
              <p className="text-muted-foreground mt-1">
                Manage all your expenses here.
              </p>
            </div>

            {/* Add Category Dialog */}
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
          </div>

          {/* Edit Expense Dialog */}
          {/* <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Category</DialogTitle>
                <DialogDescription>
                  Update your category name.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <Input
                  type="text"
                  placeholder="Category Name"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />

                <Button
                  onClick={handleEditCategories}
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Update Category"}
                </Button>
              </div>
            </DialogContent>
          </Dialog> */}

          
          <div className="flex justify-end mb-4">
            <p className="text-muted-foreground text-lg">
              Total Expenses:{" "}
              <span className="font-bold text-foreground">
                ₹ {totalAmount.toLocaleString("en-IN")}
              </span>
            </p>
          </div>

          <div className="rounded-xl border border-border text-center p-6 text-muted-foreground">
            <Table className="w-full table-fixed ">
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">Sr. no</TableHead>
                  <TableHead className="text-center">Category Name</TableHead>
                  <TableHead className="text-center">Amount</TableHead>
                  <TableHead className="text-center">Note</TableHead>
                  <TableHead className="text-center">Date</TableHead>
                  <TableHead className=" text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {expenses?.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={3}
                      className="text-center text-muted-foreground"
                    >
                      No expense found
                    </TableCell>
                  </TableRow>
                ) : (
                  expenses?.map((exp: any, index: number) => (
                    <TableRow key={exp?._id}>
                      <TableCell className=" text-muted-foreground">
                        {index + 1}
                      </TableCell>

                      <TableCell className=" font-medium">
                        {exp?.categoryId?.name}
                      </TableCell>

                      <TableCell className=" font-medium">
                        {exp?.amount}
                      </TableCell>
                      <TableCell className="whitespace-normal break-words max-w-[300px] font-medium">
                        {exp?.note}
                      </TableCell>
                      <TableCell className="font-medium">
                        {new Date(exp?.date).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </TableCell>

                      {/* <TableCell className=" ">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>

                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleEditClick(cat)}
                            >
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-500 focus:text-red-500"
                              onClick={() => handleDeleteCategories(cat?._id)}
                            >
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell> */}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </main>
      </div>
    </div>
  );
}
