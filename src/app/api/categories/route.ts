import authOptions from "@/lib/auth";
import connectDb from "@/lib/db";
import Category from "@/model/category.model";
import User from "@/model/user.model";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  
  try {
    await connectDb();
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 400 });
    }

    const { name } = await req.json();
    if (!name || name.trim() == "") {
      return NextResponse.json(
        { message: "Category name is required" },
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

    const existingCategory = await Category.findOne({
      userId: user._id,
      name: name.trim(),
    });
    if (existingCategory) {
      return NextResponse.json(
        { message: "Category already exists" },
        { status: 400 },
      );
    }

    const category = await Category.create({
      userId: user._id,
      name: name.trim(),
    });

    return NextResponse.json(
      { message: "Category created ", category },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Create category error : ${error}` },
      { status: 500 },
    );
  }
}

export async function GET() {
  
  try { 
    await connectDb();
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorize" }, { status: 400 });
    }

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json(
        { message: "User does not exists" },
        { status: 400 },
      );
    }

    const allCategory = await Category.find({
      userId: user._id,
    }).sort({
      createdAt: -1,
    });

    return NextResponse.json(
      { message: "All category fetched ", allCategory },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Get all category error : ${error}` },
      { status: 500 },
    );
  }
}
