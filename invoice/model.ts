import { z } from "zod";
import {
  ConvertKeysToSnakeCase,
  toSnakeCaseKeys,
  toCamelCaseKeys
} from "../transform";
import { snakeCase } from "change-case"

/**
 * Model representing an invoice in the system.
 * Includes details such as user information, package details, pricing, payment status, and timestamps.
 */
export const invoiceType = z.object({
  id: z.string().uuid(),
  userId: z.string(),
  userEmail: z.string().optional().nullable(),
  userName: z.string().optional().nullable(),
  // 商品信息
  packageType: z.string(),
  packageName: z.string(),
  packagePrice: z.string(),
  packageQuantity: z.number().int(),
  // 总价
  totalPrice: z.string(),
  // 折扣信息
  discountCode: z.string().optional().nullable(),
  discountAmount: z.string().optional().nullable(),
  // 支付信息
  amount: z.string(),
  isPaid: z.boolean().default(false),
  paidAt: z.date().optional().nullable(),
  paymentMethod: z.string().optional().nullable(),
  paymentDate: z.date().optional().nullable(),
  transactionId: z.string().optional().nullable(),
  // 其他信息
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

export const invoiceTypeSnakeCase = z.object(
  invoiceType.shape && Object.fromEntries(
    Object.entries(invoiceType.shape).map(([key, value]) => [snakeCase(key), value])
  )
);

export type Invoice = z.infer<typeof invoiceType>;

export type InvoiceSnakeCase = ConvertKeysToSnakeCase<Invoice>;

export const toInvoiceSnakeCase = (invoice: Invoice): InvoiceSnakeCase => {
  return toSnakeCaseKeys(invoice);
}

export const fromInvoiceSnakeCase = (invoice: InvoiceSnakeCase): Invoice => {
  return toCamelCaseKeys(invoice);
};