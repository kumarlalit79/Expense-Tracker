"use client";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import StatsCards from "@/components/dashboard/StatsCards";
import SpendingChart from "@/components/dashboard/SpendingChart";
import CategoryPieChart from "@/components/dashboard/CategoryPieChart";
import RecentExpensesTable from "@/components/dashboard/RecentExpensesTable";
import AddExpenseDialog from "@/components/dashboard/AddExpenseDialog";
import { useState } from "react";

export default function DashboardPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="flex h-screen w-full bg-background text-foreground">
      <Sidebar />

      <div className="flex flex-col flex-1 h-full md:pl-64">
        <Topbar title="Dashboard" />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
            <AddExpenseDialog
              onExpenseAdded={() => setRefreshKey((prev) => prev + 1)}
            />
          </div>

          <StatsCards refreshKey={refreshKey} />

          <div className="grid gap-4 md:grid-cols-7">
            <SpendingChart refreshKey={refreshKey} />
            <CategoryPieChart />
          </div>

          <RecentExpensesTable />
        </main>
      </div>
    </div>
  );
}
