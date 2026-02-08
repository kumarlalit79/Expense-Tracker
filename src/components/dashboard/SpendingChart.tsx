"use client";

import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function SpendingChart({ refreshKey }) {
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchChartData = async () => {
    try {
      setLoading(true);
      const result = await axios.get("/api/charts/monthly");
      console.log("fetchChartData", result)
      setChartData(result.data.data);
    } catch (error) {
      console.log("Chart fetch error:", error);
      
    }finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChartData();
  }, [refreshKey]);

  return (
    <Card className="col-span-4">
      <CardContent className="p-6">
        <div className="mb-6">
          <h3 className="text-lg font-medium">Spending Overview</h3>
          <p className="text-sm text-muted-foreground">
            Monthly spend over the last 6 months
          </p>
        </div>

        {loading ? (
          <p className="text-muted-foreground">Loading chart...</p>
        ) : (
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#334155"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  stroke="#64748b"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#64748b"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  formatter={(value) => [
                    `₹ ${Number(value).toLocaleString("en-IN")}`,
                    "Spent",
                  ]}
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    borderColor: "#1e293b",
                    borderRadius: "10px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorSpend)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
