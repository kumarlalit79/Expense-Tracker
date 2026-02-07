import mongoose from "mongoose";

interface IUser {
  _id?: mongoose.Types.ObjectId;
  name: string;
  email: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    image: { type: String },
  },
  { timestamps: true },
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
