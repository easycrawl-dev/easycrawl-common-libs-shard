import { z } from "zod";
import {
  ConvertKeysToSnakeCase,
  toSnakeCaseKeys,
  toCamelCaseKeys
} from "../transform";
import { snakeCase } from "change-case";
import { TaskStatusEnum } from "./enum";
import { crawlResultType, crawlResultSnakeCase, toCrawlResultCamelCase, toCrawlResultSnakeCase } from "../crawl";

/**
 * Model representing the parameters for initiating a crawl task.
 * Includes URLs to crawl and optional configurations for the browser and crawler.
 */
export const taskType = z.object({
  id: z.string().uuid().optional(),
  userId: z.string().optional(),
  urls: z.string().array().min(1),
  status: z.enum([TaskStatusEnum.PENDING, TaskStatusEnum.PROCESSING, TaskStatusEnum.COMPLETED, TaskStatusEnum.FAILED]).default(TaskStatusEnum.PENDING),
  results: z.array(crawlResultType).default([]).optional(),
  // Date、字符串时间（类似 2025-09-28T01:31:24.733Z）或者秒级时间戳
  createdAt: z.preprocess(
    (val) => {
      if (val instanceof Date) return val;
      if (typeof val === 'string') return new Date(val);
      if (typeof val === 'number') return new Date(val * 1000); // 秒级时间戳转毫秒
      return new Date();
    },
    z.date()
  ).default(() => new Date()),
  updatedAt: z.preprocess(
    (val) => {
      if (val instanceof Date) return val;
      if (typeof val === 'string') return new Date(val);
      if (typeof val === 'number') return new Date(val * 1000); // 秒级时间戳转毫秒
      return new Date();
    },
    z.date()
  ).default(() => new Date()),
  completedAt: z.preprocess(
    (val) => {
      if (val === null || val === undefined) return null;
      if (val instanceof Date) return val;
      if (typeof val === 'string') return new Date(val);
      if (typeof val === 'number') return new Date(val * 1000); // 秒级时间戳转毫秒
      return null;
    },
    z.date().nullable()
  ).optional().nullable(),
  isPublic: z.boolean().default(false),
  metadata: z.record(z.string(), z.any()).optional().nullable(),
  log: z.string().optional().nullable(),
});

export const taskTypeSnakeCase = z.object({
  id: taskType.shape.id,
  user_id: taskType.shape.userId,
  urls: taskType.shape.urls,
  status: taskType.shape.status,
  results: z.array(crawlResultSnakeCase).default([]).optional(),
  created_at: taskType.shape.createdAt,
  updated_at: taskType.shape.updatedAt,
  completed_at: taskType.shape.completedAt,
  is_public: taskType.shape.isPublic,
  metadata: taskType.shape.metadata,
  log: taskType.shape.log,
});

export type Task = z.infer<typeof taskType>;

export type TaskSnakeCase = z.infer<typeof taskTypeSnakeCase>;

export const toTaskSnakeCase = (task: Task): TaskSnakeCase => {
  return {
    ...toSnakeCaseKeys(task),
    results: task.results ? task.results.map(toCrawlResultSnakeCase) : [],
  };
}

export const toTaskCamelCase = (task: TaskSnakeCase): Task => {
  return {
    ...toCamelCaseKeys(task),
    results: task.results ? task.results.map(toCrawlResultCamelCase) : [],
  };
};

/**
 * Model representing a task in the system.
 * Includes details such as user information, task parameters, status, results, and timestamps.
 */
export const taskRecordType = z.object({
  id: z.string().uuid(),
  userId: z.string(),
  urls: z.string().array(),
  status: z.enum([TaskStatusEnum.PENDING, TaskStatusEnum.PROCESSING, TaskStatusEnum.COMPLETED, TaskStatusEnum.FAILED]).default(TaskStatusEnum.PENDING),
  createdAt: z.preprocess(
    (val) => {
      if (val instanceof Date) return val;
      if (typeof val === 'string') return new Date(val);
      if (typeof val === 'number') return new Date(val * 1000); // 秒级时间戳转毫秒
      return new Date();
    },
    z.date()
  ).default(() => new Date()),
  updatedAt: z.preprocess(
    (val) => {
      if (val instanceof Date) return val;
      if (typeof val === 'string') return new Date(val);
      if (typeof val === 'number') return new Date(val * 1000); // 秒级时间戳转毫秒
      return new Date();
    },
    z.date()
  ).default(() => new Date()),
  completedAt: z.preprocess(
    (val) => {
      if (val === null || val === undefined) return null;
      if (val instanceof Date) return val;
      if (typeof val === 'string') return new Date(val);
      if (typeof val === 'number') return new Date(val * 1000); // 秒级时间戳转毫秒
      return null;
    },
    z.date().nullable()
  ).optional().nullable(),
  isPublic: z.boolean().default(false)
});

export const taskRecordTypeSnakeCase = z.object(
  taskRecordType.shape && Object.fromEntries(
    Object.entries(taskRecordType.shape).map(([key, value]) => [snakeCase(key), value])
  )
);

export type TaskRecord = z.infer<typeof taskRecordType>;

export type TaskRecordSnakeCase = ConvertKeysToSnakeCase<TaskRecord>;

export const toTaskRecordSnakeCase = (task: TaskRecord): TaskRecordSnakeCase => {
  return toSnakeCaseKeys(task);
}

export const toTaskRecordCamelCase = (task: TaskRecordSnakeCase): TaskRecord => {
  return toCamelCaseKeys(task);
};

/**
 * Model representing a preview of a task in the system.
 * Includes basic task details and a selection of preview links with limited data.
 * This is used to provide a lightweight overview of the task without exposing full results.
 */
export const taskPreviewType = z.object({
  id: taskType.shape.id,
  userId: taskType.shape.userId,
  previewLinks: z.array(z.object({
    url: z.string().url(),
    html: z.string().optional(),
    screenshot: z.string().optional().nullable(),
    mhtml: z.string().optional().nullable(),
  })).default([]).optional(),
  log: z.string().optional().nullable(),
});

export const taskPreviewTypeSnakeCase = z.object({
  id: taskPreviewType.shape.id,
  user_id: taskPreviewType.shape.userId,
  preview_links: taskPreviewType.shape.previewLinks,
  log: taskPreviewType.shape.log,
});

export type TaskPreview = z.infer<typeof taskPreviewType>;

export type TaskPreviewSnakeCase = z.infer<typeof taskPreviewTypeSnakeCase>;

export const toTaskPreviewSnakeCase = (task: TaskPreview): TaskPreviewSnakeCase => {
  return {
    ...toSnakeCaseKeys(task),
  };
}

export const toTaskPreviewCamelCase = (task: TaskPreviewSnakeCase): TaskPreview => {
  return {
    ...toCamelCaseKeys(task),
  };
}