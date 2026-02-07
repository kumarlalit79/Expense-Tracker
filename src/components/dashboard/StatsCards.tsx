import { Card, CardContent } from "@/components/ui/card";
import { MOCK_STATS } from "@/lib/data";

export default function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {MOCK_STATS.map((stat, i) => (
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
              <span
                className={`${
                  stat.trendUp ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {stat.trend}
              </span>
              <span className="text-muted-foreground ml-2">{stat.desc}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
