import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  deviceId: string;
  status: "pendingVerification" | "verified" | "rejected";
  balance: number;
  createdAt: Date;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  deviceId: { type: String, required: true, unique: true },
  status: {
    type: String,
    enum: ["pendingVerification", "verified", "rejected"],
    default: "pendingVerification",
  },
  balance: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IUser>("User", userSchema);
