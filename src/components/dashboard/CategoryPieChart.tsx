"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import { Card, CardContent } from "@/components/ui/card";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = ["#3b82f6", "#60a5fa", "#93c5fd", "#bfdbfe", "#1e40af"];

export default function CategoryPieChart({ refreshKey }) {
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCategoryChart = async () => {
    try {
      setLoading(true);

      const result = await axios.get("/api/charts/categories");

      const dataWithColors = result.data.data.map(
        (item: any, index: number) => {
          return {
            ...item,
            color: COLORS[index % COLORS.length],
          };
        },
      );

      setChartData(dataWithColors);
    } catch (error) {
      console.log("Category chart fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryChart();
  }, [refreshKey]);

  const totalAmount = chartData.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card className="col-span-3">
      <CardContent className="p-6">
        <div className="mb-6">
          <h3 className="text-lg font-medium">Category Breakdown</h3>
          <p className="text-sm text-muted-foreground">Expenses by category</p>
        </div>

        {loading ? (
          <p className="text-muted-foreground">Loading chart...</p>
        ) : chartData.length === 0 ? (
          <p className="text-muted-foreground">No data found</p>
        ) : (
          <div className="h-[240px] w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                  nameKey="name"
                  stroke="none"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>

                <Tooltip
                  cursor={{ fill: "rgba(255,255,255,0.05)" }}
                  formatter={(value: any) =>
                    `₹ ${Number(value).toLocaleString("en-IN")}`
                  }
                  labelFormatter={(label: any) => `Category: ${label}`}
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    borderColor: "#1e293b",
                    borderRadius: "10px",
                    color: "#fff",
                  }}
                  labelStyle={{
                    color: "#fff",
                    fontWeight: "600",
                  }}
                  itemStyle={{
                    color: "#fff",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Center Text */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] text-center pointer-events-none">
              <div className="text-2xl font-bold">
                ₹ {totalAmount.toLocaleString("en-IN")}
              </div>
              <div className="text-xs text-muted-foreground">Total</div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
