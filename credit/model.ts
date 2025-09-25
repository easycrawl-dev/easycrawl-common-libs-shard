import { z } from "zod";
import {
  ConvertKeysToSnakeCase,
  toSnakeCaseKeys,
  toCamelCaseKeys
} from "../transform";
import { snakeCase } from "change-case";
import { CreditTransactionActionEnum } from "./enum";

/**
 * Model representing a credit transaction in the system.
 * Includes details such as user information, task association, action type, amount, description, and timestamps.
 */
export const creditTransactionType = z.object({
  id: z.string().uuid(),
  userId: z.string(),
  taskId: z.string(),
  action: z.enum([CreditTransactionActionEnum.ADD, CreditTransactionActionEnum.DEDUCT]),
  amount: z.number().int(),
  description: z.string().optional().nullable(),
  createdAt: z.date().default(() => new Date())
});

export const creditTransactionTypeSnakeCase = z.object(
  creditTransactionType.shape && Object.fromEntries(
    Object.entries(creditTransactionType.shape).map(([key, value]) => [snakeCase(key), value])
  )
);

export type CreditTransaction = z.infer<typeof creditTransactionType>;

export type CreditTransactionSnakeCase = ConvertKeysToSnakeCase<CreditTransaction>;

export const toCreditTransactionSnakeCase = (transaction: CreditTransaction): CreditTransactionSnakeCase => {
  return toSnakeCaseKeys(transaction);
}

export const fromCreditTransactionSnakeCase = (transaction: CreditTransactionSnakeCase): CreditTransaction => {
  return toCamelCaseKeys(transaction);
};