import { z } from "zod";
import {
  ConvertKeysToSnakeCase,
  toSnakeCaseKeys,
  toCamelCaseKeys
} from "../transform";
import { snakeCase } from "change-case";

/**
 * Model representing a crawl operation in the system.
 * Includes details such as associated task, crawl parameters, status, results, and timestamps.
 * Crawl4AI Documentation: https://docs.crawl4ai.com/api/crawl-result/#1-basic-crawl-info
 */
export const crawlResultType = z.object({
  url: z.string().url(),
  html: z.string().optional(),
  success: z.boolean().default(false),
  cleanedHtml: z.string().optional().nullable(),
  fitHtml: z.string().optional().nullable(), // Preprocessed HTML optimized for extraction
  media: z.record(z.string(), z.array(z.record(z.string(), z.any()))).optional().nullable(),
  links: z.record(z.string(), z.array(z.record(z.string(), z.any()))).optional().nullable(),
  downloadedFiles: z.array(z.string()).optional().nullable(),
  screenshot: z.string().optional().nullable(),
  pdf: z.string().optional().nullable(), // 改为 string 类型，通常以 base64 编码存储
  mhtml: z.string().optional().nullable(),
  markdown: z.union([z.string(), z.record(z.string(), z.any())]).optional().nullable(),
  extractedContent: z.string().optional().nullable(),
  metadata: z.record(z.string(), z.any()).optional().nullable(),
  errorMessage: z.string().optional().nullable(),
  sessionId: z.string().optional().nullable(),
  responseHeaders: z.record(z.string(), z.any()).optional().nullable(),
  statusCode: z.number().optional().nullable(),
  sslCertificate: z.record(z.string(), z.any()).optional().nullable(),
  dispatchResult: z.record(z.string(), z.any()).optional().nullable()
});

export const crawlResultSnakeCase = z.object(
  crawlResultType.shape && Object.fromEntries(
    Object.entries(crawlResultType.shape).map(([key, value]) => [snakeCase(key), value])
  )
);

export type CrawlResult = z.infer<typeof crawlResultType>;

export type CrawlResultSnakeCase = ConvertKeysToSnakeCase<CrawlResult>;

export const toCrawlResultSnakeCase = (crawl: CrawlResult): CrawlResultSnakeCase => {
  return toSnakeCaseKeys(crawl);
}

export const toCrawlResultCamelCase = (crawl: CrawlResultSnakeCase): CrawlResult => {
  return toCamelCaseKeys(crawl);
};