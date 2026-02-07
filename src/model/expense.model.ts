import mongoose from "mongoose";

interface IExpense {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  categoryId: mongoose.Types.ObjectId;
  amount: number;
  note: string;
  date: Date
}

const expenseSchema = new mongoose.Schema<IExpense>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  amount: { type: Number, required: true },
  note: { type: String, default: "" },
  date: { type: Date, required: true },
});

const Expense =
  mongoose.models.Expense || mongoose.model("Expense", expenseSchema);
export default Expense;
