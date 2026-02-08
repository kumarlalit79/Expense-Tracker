"use client";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";
import { useEffect, useState } from "react";
import { DollarSign, CreditCard, Receipt, TrendingUp } from "lucide-react";

export default function StatsCards({refreshKey}) {
  const [stats, setStats] = useState<any[]>(null);
  

  useEffect(() => {
    const fetchStats = async () => {
      const result = await axios.get("/api/stats");
      console.log("fetchStats", result);
      console.log("fetchStats", result.data.stats);
      setStats(result?.data?.stats);
    };
    
    fetchStats();
  }, [refreshKey]);

  if (!stats) {
    return <p className="text-muted-foreground">Loading stats...</p>;
  }

  const statsArray = [
    {
      title: "Total Expenses",
      value: `₹ ${stats?.totalExpenses?.toLocaleString("en-IN")}`,
      desc: "All time",
      icon: DollarSign,
    },
    {
      title: "Monthly Spend",
      value: `₹ ${stats?.totalThisMonth?.toLocaleString("en-IN")}`,
      desc: "This Month",
      icon: CreditCard,
    },
    {
      title: "Transactions",
      value: stats?.transactionsCount,
      desc: "Total Count",
      icon: Receipt,
    },
    {
      title: "Top Category",
      value: stats?.topCategory?.name || "No Category",
      desc: `₹ ${stats?.topCategory?.total?.toLocaleString("en-IN") || 0}`,
      icon: TrendingUp,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statsArray.map((stat, i) => (
        <Card key={i} className="hover:border-muted-foreground/30 transition">
          <CardContent className="p-6">
            <div className="flex items-center justify-between pb-2">
              <span className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </span>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </div>

            <div className="text-2xl font-bold">{stat.value}</div>

            <div className="flex items-center text-xs mt-2">
              <span className="text-muted-foreground">{stat.desc}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
