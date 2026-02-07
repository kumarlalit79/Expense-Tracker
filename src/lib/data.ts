import { DollarSign, CreditCard, Receipt, TrendingUp } from "lucide-react";

export const MOCK_STATS = [
  {
    title: "Total Expenses",
    value: "$12,450.00",
    desc: "This Month",
    trend: "+12.5%",
    trendUp: true,
    icon: DollarSign,
  },
  {
    title: "Weekly Spend",
    value: "$3,204.50",
    desc: "This Week",
    trend: "-4.2%",
    trendUp: false,
    icon: CreditCard,
  },
  {
    title: "Transactions",
    value: "142",
    desc: "Total count",
    trend: "+8.1%",
    trendUp: true,
    icon: Receipt,
  },
  {
    title: "Top Category",
    value: "Software",
    desc: "$4,200 spent",
    trend: "+2.4%",
    trendUp: true,
    icon: TrendingUp,
  },
];

export const CHART_DATA_MONTHLY = [
  { name: "Jan", value: 4000 },
  { name: "Feb", value: 3000 },
  { name: "Mar", value: 5500 },
  { name: "Apr", value: 4800 },
  { name: "May", value: 7200 },
  { name: "Jun", value: 6100 },
];

export const CHART_DATA_CATEGORIES = [
  { name: "Infrastructure", value: 35, color: "#3b82f6" },
  { name: "Marketing", value: 25, color: "#60a5fa" },
  { name: "Personnel", value: 20, color: "#93c5fd" },
  { name: "Software", value: 15, color: "#bfdbfe" },
  { name: "Office", value: 5, color: "#1e40af" },
];

export const RECENT_TRANSACTIONS = [
  {
    id: 1,
    date: "2023-10-24",
    category: "Software",
    note: "AWS Subscription",
    amount: "$1,240.00",
    status: "Completed",
  },
  {
    id: 2,
    date: "2023-10-23",
    category: "Office",
    note: "Herman Miller Chair",
    amount: "$850.00",
    status: "Pending",
  },
  {
    id: 3,
    date: "2023-10-22",
    category: "Marketing",
    note: "Google Ads Campaign",
    amount: "$2,100.00",
    status: "Completed",
  },
  {
    id: 4,
    date: "2023-10-21",
    category: "Software",
    note: "Slack Enterprise",
    amount: "$450.00",
    status: "Completed",
  },
  {
    id: 5,
    date: "2023-10-20",
    category: "Travel",
    note: "Flight to NY",
    amount: "$620.00",
    status: "Processing",
  },
];
