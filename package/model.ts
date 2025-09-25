import { z } from "zod";
import {
  ConvertKeysToSnakeCase,
  toSnakeCaseKeys,
  toCamelCaseKeys
} from "../transform";
import { snakeCase } from "change-case"

/**
 * Model representing a package in the system.
 * Includes details such as name, price, description, features, credits, and optional priority queue days.
 */
export type PackageInfo = {
  name: string;
  price: number;
  description: string;
  features: string[];
  credits: number;
  priorityQueueDays?: number;
}

export const packageType = z.object({
  id: z.string().uuid(),
  userId: z.string(),
  invoiceId: z.string(),
  // 商品信息
  packageType: z.string(),
  name: z.string(),
  // 状态信息
  isActive: z.boolean().default(false),
  credits: z.number().int().default(0),
  usedCredits: z.number().int().default(0),
  priorityQueueDays: z.number().int().default(0),
  usedPriorityQueueDays: z.number().int().default(0),
  expirationDate: z.date().optional().nullable(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
  expiredAt: z.date().optional().nullable(),
});

export const packageTypeSnakeCase = z.object(
  packageType.shape && Object.fromEntries(
    Object.entries(packageType.shape).map(([key, value]) => [snakeCase(key), value])
  )
);

export type Package = z.infer<typeof packageType>;

export type PackageSnakeCase = ConvertKeysToSnakeCase<Package>;

export const toPackageSnakeCase = (pkg: Package): PackageSnakeCase => {
  return toSnakeCaseKeys(pkg);
}

export const toPackageCamelCase = (pkg: PackageSnakeCase): Package => {
  return toCamelCaseKeys(pkg);
}