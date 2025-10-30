import { Router } from "express";
import { body } from "express-validator";
import {
  deposit,

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

export default router;