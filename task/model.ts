import { z } from "zod";
import {
  ConvertKeysToSnakeCase,
  toSnakeCaseKeys,
  toCamelCaseKeys
} from "../transform";
import { snakeCase } from "change-case";
import { TaskStatusEnum } from "./enum";
import { crawlResultType } from "../crawl";

/**
 * Model representing the parameters for initiating a crawl task.
 * Includes URLs to crawl and optional configurations for the browser and crawler.
 */
export const taskType = z.object({
  id: z.string().uuid().optional(),
  urls: z.string().array().min(1),
  status: z.enum([TaskStatusEnum.PENDING, TaskStatusEnum.PROGRESS, TaskStatusEnum.COMPLETED, TaskStatusEnum.FAILED]).default(TaskStatusEnum.PENDING),
  results: z.array(crawlResultType).default([]),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
  completedAt: z.date().optional().nullable(),
  isPublic: z.boolean().default(false),
});

export const taskTypeSnakeCase = z.object(
  taskType.shape && Object.fromEntries(
    Object.entries(taskType.shape).map(([key, value]) => [snakeCase(key), value])
  )
);

export type Task = z.infer<typeof taskType>;

export type TaskSnakeCase = ConvertKeysToSnakeCase<Task>;

export const toTaskSnakeCase = (task: Task): TaskSnakeCase => {
  return toSnakeCaseKeys(task);
}

export const toTaskCamelCase = (task: TaskSnakeCase): Task => {
  return toCamelCaseKeys(task);
};

/**
 * Model representing a task in the system.
 * Includes details such as user information, task parameters, status, results, and timestamps.
 */
export const taskRecordType = z.object({
  id: z.string().uuid(),
  userId: z.string(),
  urls: z.string().array(),
  status: z.enum([TaskStatusEnum.PENDING, TaskStatusEnum.PROGRESS, TaskStatusEnum.COMPLETED, TaskStatusEnum.FAILED]).default(TaskStatusEnum.PENDING),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
  completedAt: z.date().optional().nullable(),
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

