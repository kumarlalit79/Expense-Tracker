"use client";

import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import ThemeToggle from "@/components/theme-toggle";

export default function Topbar({ title }: { title: string }) {
  return (
    <header className="sticky top-0 z-10 flex h-16 w-full items-center justify-between border-b border-border bg-background/70 backdrop-blur-sm px-4 md:px-6">
      <h1 className="text-lg font-semibold hidden md:block">{title}</h1>

      <div className="flex items-center gap-4">
        <div className="relative hidden sm:block w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search transactions..." className="pl-9" />
        </div>
        <ThemeToggle />
        <button className="relative rounded-full p-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-blue-500 ring-2 ring-background"></span>
        </button>
      </div>
    </header>
  );
}
