import authOptions from "@/lib/auth";
import connectDb from "@/lib/db";
import Category from "@/model/category.model";
import Expense from "@/model/expense.model";
import User from "@/model/user.model";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDb();

    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" });
    }

    const { amount, categoryId, note, date } = await req.json();
    if (!amount || !categoryId || !date) {
      return Response.json(
        { message: "All fields are required" },
        { status: 400 },
      );
    }

    const user = await User.findOne({ email: session?.user?.email });
    if (!user) {
      return NextResponse.json(
        { message: "User does not exists" },
        { status: 400 },
      );
    }

    const category = await Category.findOne({
      _id: categoryId,
      userId: user._id,
    });
    if (!category) {
      return NextResponse.json(
        { message: "Category does not exists" },
        { status: 400 },
      );
    }

    const expense = await Expense.create({
      userId: user._id,
      categoryId,
      amount,
      note,
      date,
    });
    return NextResponse.json(
      { message: "Expense created successfully", expense },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Create expense error : ${error}` },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    await connectDb();

    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" });
    }

    const user = await User.findOne({ email: session?.user?.email });
    if (!user) {
      return NextResponse.json(
        { message: "User does not exists" },
        { status: 400 },
      );
    }

    const expenses = await Expense.find({ userId: user._id })
      .populate("categoryId", "name")
      .sort({ date: -1 });

    return NextResponse.json(
      { message: "All expenses fetched successfully", expenses },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Get all expense error : ${error}` },
      { status: 500 },
    );
  }
}
