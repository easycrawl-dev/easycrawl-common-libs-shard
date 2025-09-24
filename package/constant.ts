import { PackageTypeEnum } from "./enum";
import { PackageInfo } from "./model";

/**
 * Details of each package type.
 * Includes name, price, description, features, credits, and optional priority queue days.
 */
export const PACKAGE_DETAILS: Record<string, PackageInfo> = {
  [PackageTypeEnum.FREE]: {
    name: "Free Trial",
    price: 0,
    description:
      "50 credits monthly allowance, can't be carried over to the next month. Limited features.",
    features: [
      "Monthly limited credits",
      "Basic queue",
      "Limited CAPTCHA solving success rate (~90%)",
      "Community support",
    ],
    credits: 50,
    priorityQueueDays: 0,
  },
  [PackageTypeEnum.ALPHA]: {
    name: "Alpha Package",
    price: 0,
    description:
      "1,000 credits for testing purposes.",
    features: [
      "For testing only",
      "Can be purchased unlimited times",
      "Own up to 5 at the same time",
      "All credits will expire on 2025/12/31",
    ],
    credits: 1000,
    priorityQueueDays: 0,
  },
  [PackageTypeEnum.BASIC]: {
    name: "Basic Package",
    price: 9.99,
    description:
      "2,000 credits that do not expire, and priority queue access for up to 31 days (coming soon).",
    features: [
      "2,000 credits never expire",
      "Priority queue (coming soon)",
      "Higher CAPTCHA solving success rate (>95%)",
      "Support within 72 hours"
    ],
    credits: 2000,
    priorityQueueDays: 31,
  },
  [PackageTypeEnum.PREMIUM]: {
    name: "Premium Package",
    price: 49.99,
    description:
      "12,000 credits that do not expire, and priority queue access for up to 186 days (coming soon).",
    features: [
      "12,000 credits never expire",
      "Priority queue (coming soon)",
      "Highest CAPTCHA solving success rate (>97%)",
      "Support within 24 hours"
    ],
    credits: 12000,
    priorityQueueDays: 186,
  },
};