import userModel from '../models/userModel.js';
import transactionModel from '../models/transactionModel.js';
import type { TransactionDto, TransactionResponseDto } from '../dtos/userDto.js';

export class SavingsService {
  async deposit(userId: string, transactionData: TransactionDto): Promise<{ balance: number; transaction: TransactionResponseDto }> {
    const { amount } = transactionData;

    if (amount <= 0) {
      throw new Error('Amount must be positive');
    }

    const user = await userModel.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    user.balance += amount;
    await user.save();

    const transaction = new transactionModel({
      userId,
      type: 'deposit',
      amount,
      balanceAfter: user.balance,
    });
    await transaction.save();

    return {
      balance: user.balance,
      transaction: {
        id: String(transaction._id),
        type: transaction.type,
        amount: transaction.amount,
        balanceAfter: transaction.balanceAfter,
        createdAt: transaction.createdAt,
      },
    };
  }

  async withdraw(userId: string, transactionData: TransactionDto): Promise<{ balance: number; transaction: TransactionResponseDto }> {
    const { amount } = transactionData;

    if (amount <= 0) {
      throw new Error('Amount must be positive');
    }

    const user = await userModel.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    if (user.balance < amount) {
      throw new Error('Insufficient balance');
    }

    user.balance -= amount;
    await user.save();

    const transaction = new transactionModel({
      userId,
      type: 'withdraw',
      amount,
      balanceAfter: user.balance,
    });
    await transaction.save();

    return {
      balance: user.balance,
      transaction: {
        id: String(transaction._id),
        type: transaction.type,
        amount: transaction.amount,
        balanceAfter: transaction.balanceAfter,
        createdAt: transaction.createdAt,
      },
    };
  }

  async getBalance(userId: string): Promise<number> {
    const user = await userModel.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user.balance;
  }

  async getTransactions(userId: string): Promise<TransactionResponseDto[]> {
    const transactions = await transactionModel.find({ userId })
      .sort({ createdAt: -1 })
      .limit(50);

    return transactions.map((t) => ({
      id: String(t._id),
      type: t.type,
      amount: t.amount,
      balanceAfter: t.balanceAfter,
      createdAt: t.createdAt,
    }));
  }
}

export const savingsService = new SavingsService();