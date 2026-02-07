import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import StatsCards from "@/components/dashboard/StatsCards";
import SpendingChart from "@/components/dashboard/SpendingChart";
import CategoryPieChart from "@/components/dashboard/CategoryPieChart";
import RecentExpensesTable from "@/components/dashboard/RecentExpensesTable";
import AddExpenseDialog from "@/components/dashboard/AddExpenseDialog";

export default function DashboardPage() {
  return (
    <div className="flex h-screen w-full bg-background text-foreground">
      <Sidebar />

      <div className="flex flex-col flex-1 h-full md:pl-64">
        <Topbar title="Dashboard" />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
            <AddExpenseDialog />
          </div>

          <StatsCards />

          <div className="grid gap-4 md:grid-cols-7">
            <SpendingChart />
            <CategoryPieChart />
          </div>

          <RecentExpensesTable />
        </main>
      </div>
    </div>
  );
}
