import { Router } from "express";
import { body } from "express-validator";
import {
  deposit,
  getBalance,
  withdraw,

} from "../controllers/savingsController.js";
import { authenticateToken } from "../middlewares/auth.js";

const router = Router();

/**
 * @swagger
 * /api/savings/deposit:
 *   post:
 *     summary: Deposit money
 *     tags: [Savings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 minimum: 0.01
 *     responses:
 *       200:
 *         description: Deposit successful
 *       400:
 *         description: Invalid amount
 */
router.post(
  "/deposit",
  authenticateToken,
  [body("amount").isFloat({ min: 0.01 })],
  deposit
);


/**
 * @swagger
 * /api/savings/withdraw:
 *   post:
 *     summary: Withdraw money
 *     tags: [Savings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 minimum: 0.01
 *     responses:
 *       200:
 *         description: Withdrawal successful
 *       400:
 *         description: Insufficient funds
 */
router.post('/withdraw', authenticateToken, [
  body('amount').isFloat({ min: 0.01 })
], withdraw);

/**
 * @swagger
 * /api/savings/balance:
 *   get:
 *     summary: Get current balance
 *     tags: [Savings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current balance
 */
router.get('/balance', authenticateToken, getBalance);

export default router;