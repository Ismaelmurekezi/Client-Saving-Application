import type { Response } from "express";
import { validationResult } from "express-validator";
import userModel from "../models/userModel.js";
import transactionModel from "../models/transactionModel.js";
import type { TransactionDto } from "../dtos/userDto.js";
import type { AuthRequest } from "../middlewares/auth.js";

export const deposit = async (req: AuthRequest, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { amount }: TransactionDto = req.body;
    const userId = req.user._id;

    if (amount <= 0) {
      return res.status(400).json({ message: "Amount must be positive" });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.balance += amount;
    await user.save();

    const transaction = new transactionModel({
      userId,
      type: "deposit",
      amount,
      balanceAfter: user.balance,
    });
    await transaction.save();

    res.json({
      message: "Deposit successful",
      balance: user.balance,
      transaction: {
        id: String(transaction._id),
        type: transaction.type,
        amount: transaction.amount,
        balanceAfter: transaction.balanceAfter,
        createdAt: transaction.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


