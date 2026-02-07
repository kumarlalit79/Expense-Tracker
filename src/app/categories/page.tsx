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

export default function CategoriesPage() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);

  const [editId, setEditId] = useState("");
  const [editName, setEditName] = useState("");
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleCategory = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Category name is required");
      return;
    }

    try {
      setLoading(true);

      const result = await axios.post("/api/categories", {
        name: name.trim(),
      });

      console.log("Category created:", result.data);

      setName("");
      alert("Category Added Successfully!");
      await handleAllCategories();
    } catch (error) {
      console.log("Add Category Error : ", error);
      alert("Category add failed!");
    } finally {
      setLoading(false);
    }
  };

  const handleAllCategories = async () => {
    try {
      const result = await axios.get("/api/categories");
      console.log("All categories : ", result);
      console.log("All categories : ", result.data.allCategory);
      setCategories(result.data.allCategory);
    } catch (error) {
      console.log("Get all Category Error : ", error);
      alert("Category get failed!");
    }
  };

  const handleDeleteCategories = async (id: string) => {
    try {
      const result = await axios.delete(`/api/categories/${id}`);
      console.log("delete category : ", result);
      console.log("Deleting ID:", id);
      alert("Category Deleted");
      await handleAllCategories();
    } catch (error) {
      console.log("Delete Category Error : ", error);
      alert("Category delete failed!");
    }
  };

  const handleEditClick = (cat: any) => {
    setEditId(cat._id);
    setEditName(cat.name);
    setIsEditOpen(true);
  };

  const handleEditCategories = async () => {
  if (!editName.trim()) {
    alert("Category name is required");
    return;
  }

  try {
    setLoading(true);

    const result = await axios.put(`/api/categories/${editId}`, {
      name: editName.trim(),
    });

    console.log(result);

    alert("Category Updated!");
    setIsEditOpen(false);
    setEditId("");
    setEditName("");

    await handleAllCategories();
  } catch (error) {
    console.log("Edit Category Error : ", error);
    alert("Category edit failed!");
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    handleAllCategories();
  }, []);

  return (
    <div className="flex h-screen w-full bg-background text-foreground">
      <Sidebar />

      <div className="flex flex-col flex-1 h-full md:pl-64">
        <Topbar title="Categories" />

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {/* Header Row */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">Categories</h2>
              <p className="text-muted-foreground mt-1">
                Manage all your categories here.
              </p>
            </div>

            {/* Add Category Dialog */}
            <Dialog>
              <DialogTrigger asChild>
                <Button className="shadow-lg shadow-blue-900/20">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Category
                </Button>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Category</DialogTitle>
                  <DialogDescription>
                    Create a category to organize your expenses.
                  </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleCategory} className="space-y-4">
                  <Input
                    type="text"
                    placeholder="Category Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Saving..." : "Save Category"}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Edit Category Dialog */}
          <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
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
          </Dialog>

          <div className="rounded-xl border border-border text-center p-6 text-muted-foreground">
            <Table className="w-full table-fixed ">
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">Sr. no</TableHead>
                  <TableHead className="text-center">Category Name</TableHead>
                  <TableHead className=" text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {categories?.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={3}
                      className="text-center text-muted-foreground"
                    >
                      No categories found
                    </TableCell>
                  </TableRow>
                ) : (
                  categories?.map((cat: any, index: number) => (
                    <TableRow key={cat?._id}>
                      <TableCell className=" text-muted-foreground">
                        {index + 1}
                      </TableCell>

                      <TableCell className=" font-medium">
                        {cat?.name}
                      </TableCell>

                      <TableCell className=" ">
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
                      </TableCell>
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
