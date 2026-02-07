import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";

export default function ExpensesPage() {
  return (
    <div className="flex h-screen w-full bg-background text-foreground">
      <Sidebar />

      <div className="flex flex-col flex-1 h-full md:pl-64">
        <Topbar title="Expenses" />

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <h2 className="text-2xl font-bold">Expenses Page</h2>
          <p className="text-muted-foreground mt-2">
            Here you will manage all expenses.
          </p>
        </main>
      </div>
    </div>
  );
}
