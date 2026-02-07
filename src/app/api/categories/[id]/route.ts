import authOptions from "@/lib/auth";
import connectDb from "@/lib/db";
import Category from "@/model/category.model";
import User from "@/model/user.model";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    await connectDb();
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json("Unauthorize");
    }

    const { name } = await req.json();
    if (!name || name.trim() == "") {
      return NextResponse.json(
        { message: "Name is required" },
        { status: 400 },
      );
    }

    const user = await User.findOne({ email: session?.user?.email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
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

    const updatedCategory = await Category.findByIdAndUpdate(
      { _id: id, userId: user._id },
      { name: name.trim() },
      { new: true },
    );

    if (!updatedCategory) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "Category updated successfully", category: updatedCategory },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Delete category error : ${error}` },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
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

    console.log("PARAM ID:", id);
    console.log("USER ID:", user._id);

    const deletedCategory = await Category.findOneAndDelete({
      _id: id,
      userId: user._id,
    });

    if (!deletedCategory) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "Category deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Delete category error : ${error}` },
      { status: 500 },
    );
  }
}
