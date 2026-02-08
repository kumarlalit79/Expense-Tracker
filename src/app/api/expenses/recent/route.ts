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
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const expenses = await Expense.find({ userId: user._id })
      .populate("categoryId")
      .sort({ date: -1, createdAt: -1 })
      .limit(5);

    return NextResponse.json(
      { message: "Recent expenses fetched", expenses },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Recent expenses error: ${error}` },
      { status: 500 },
    );
  }
}
