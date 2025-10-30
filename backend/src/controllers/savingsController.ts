import type { Response } from "express";
import { validationResult } from "express-validator";
import { savingsService } from "../services/savingsService.js";
import type { TransactionDto } from "../dtos/userDto.js";
import type { AuthRequest } from "../middlewares/auth.js";

export const deposit = async (req: AuthRequest, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const transactionData: TransactionDto = req.body;
    const { balance, transaction } = await savingsService.deposit(req.user._id, transactionData);

    res.json({
      message: "Deposit successful",
      balance,
      transaction,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Server error";
    const status = message === "Amount must be positive" ? 400 :
                   message === "User not found" ? 404 : 500;
    res.status(status).json({ message });
  }
};

export const withdraw = async (req: AuthRequest, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const transactionData: TransactionDto = req.body;
    const { balance, transaction } = await savingsService.withdraw(req.user._id, transactionData);

    res.json({
      message: "Withdrawal successful",
      balance,
      transaction,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Server error";
    const status = message === "Amount must be positive" || message === "Insufficient balance" ? 400 :
                   message === "User not found" ? 404 : 500;
    res.status(status).json({ message });
  }
};

export const getBalance = async (req: AuthRequest, res: Response) => {
  try {
    const balance = await savingsService.getBalance(req.user._id);
    res.json({ balance });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Server error";
    const status = message === "User not found" ? 404 : 500;
    res.status(status).json({ message });
  }
};

export const getTransactions = async (req: AuthRequest, res: Response) => {
  try {
    const transactions = await savingsService.getTransactions(req.user._id);
    res.json({ transactions });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

