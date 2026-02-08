import authOptions from "@/lib/auth";
import connectDb from "@/lib/db";
import Expense from "@/model/expense.model";
import User from "@/model/user.model";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDb();
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorize" }, { status: 400 });
    }
    const user = await User.findOne({ email: session?.user?.email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    }

    const userId = user._id;

    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const weekStart = new Date();
    weekStart.setDate(now.getDate() - 7);

    const allExpenses = await Expense.find({ userId }).populate("categoryId");

    const totalExpenses = allExpenses.reduce((sum, exp) => sum + exp.amount, 0);

    const totalThisMonth = allExpenses
      .filter((exp) => new Date(exp.date) >= monthStart)
      .reduce((sum, exp) => sum + exp.amount, 0);
    const weeklySpend = allExpenses
      .filter((exp) => new Date(exp.date) >= weekStart)
      .reduce((sum, exp) => sum + exp.amount, 0);

    const transactionsCount = allExpenses.length;
    let topCategory: any = null;

    const categoryTotals: Record<string, { name: string; total: number }> = {};

    allExpenses.forEach((exp: any) => {
      const catId = exp.categoryId?._id?.toString();
      const catName = exp.categoryId?.name;

      if (!catId) return;

      if (!categoryTotals[catId]) {
        categoryTotals[catId] = { name: catName, total: 0 };
      }

      categoryTotals[catId].total += exp.amount;
    });

    const sortedCategories = Object.entries(categoryTotals).sort(
      (a, b) => b[1].total - a[1].total,
    );

    if (sortedCategories.length > 0) {
      topCategory = {
        categoryId: sortedCategories[0][0],
        name: sortedCategories[0][1].name,
        total: sortedCategories[0][1].total,
      };
    }

    return NextResponse.json(
      {
        message: "Stats fetched successfully",
        stats: {
          totalExpenses,
          totalThisMonth,
          weeklySpend,
          transactionsCount,
          topCategory,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Stats card error", error },
      { status: 500 },
    );
  }
}
