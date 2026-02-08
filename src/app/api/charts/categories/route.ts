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

    const expenses = await Expense.find({ userId: user._id }).populate(
      "categoryId"
    );

    const categoryTotals: Record<string, any> = {};

    expenses.forEach((exp: any) => {
      const categoryId = exp.categoryId?._id?.toString();
      const categoryName = exp.categoryId?.name;

      if (!categoryId) return;

      if (!categoryTotals[categoryId]) {
        categoryTotals[categoryId] = {
          name: categoryName,
          value: 0,
        };
      }

      categoryTotals[categoryId].value += exp.amount;
    });

    const finalData = Object.values(categoryTotals);

    return NextResponse.json(
      {
        message: "Category chart data fetched successfully",
        data: finalData,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Category chart error: ${error}` },
      { status: 500 }
    );
  }
}
