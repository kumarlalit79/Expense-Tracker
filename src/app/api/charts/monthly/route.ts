import connectDb from "@/lib/db";
import authOptions from "@/lib/auth";

import Expense from "@/model/expense.model";
import User from "@/model/user.model";

import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDb();

    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const userId = user._id;

    const months = [];
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthName = date.toLocaleString("en-IN", { month: "short" });
      const year = date.getFullYear();
      months.push({
        name: `${monthName}`,
        month: date.getMonth(),
        year,
        value: 0,
      });
    }

    const expenses = await Expense.find({ userId });
    expenses.forEach((exp) => {
      const expDate = new Date(exp.date);
      const expMonth = expDate.getMonth();
      const expYear = expDate.getFullYear();

      const monthObj = months.find(
        (m) => m.month === expMonth && m.year === expYear,
      );

      if (monthObj) {
        monthObj.value += exp.amount;
      }
    });
    const finalData = months.map((m) => ({
      name: m.name,
      value: m.value,
    }));

    return NextResponse.json(
      {
        message: "Monthly chart data fetched successfully",
        data: finalData,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Monthly chart error: ${error}` },
      { status: 500 },
    );
  }
}
