import { snakeCase, camelCase } from "change-case";

/**
 * 将对象的键从驼峰命名转换为下划线命名
 * Utility type to transform keys of an object from camelCase to snake_case
 */
export type SnakeCaseKeys<T> = {
  [K in keyof T as K extends string ? Lowercase<`${K extends Capitalize<K> ? '_' : ''}${K}`> : K]: T[K]
};

/**
 * 更准确的 Snake Case 类型转换
 */
export type ToSnakeCase<S extends string> = 
  S extends `${infer T}${infer U}` ?
    T extends Uppercase<T> ?
      `${T extends Capitalize<T> ? '_' : ''}${Lowercase<T>}${ToSnakeCase<U>}` :
      `${T}${ToSnakeCase<U>}`
    : S;

/**
 * 更通用的类型转换工具
 */
export type ConvertKeysToSnakeCase<T> = {
  [K in keyof T as K extends string ? ToSnakeCase<K> : never]: T[K] extends object
    ? T[K] extends Date
      ? T[K]
      : T[K] extends Array<infer U>
        ? T[K]
        : ConvertKeysToSnakeCase<T[K]>
    : T[K];
};

/**
 * 递归地将对象的键从驼峰命名转换为下划线命名
 * Utility function to transform object keys from camelCase to snake_case
 */
/**
 * 将字符串从下划线命名转换为驼峰命名
 */
export type ToCamelCase<S extends string> = 
  S extends `${infer P}_${infer Q}`
    ? `${P}${Capitalize<ToCamelCase<Q>>}`
    : S;

/**
 * 更通用的类型转换工具，将键从下划线命名转换为驼峰命名
 */
export type ConvertKeysToCamelCase<T> = {
  [K in keyof T as K extends string ? ToCamelCase<K> : never]: T[K] extends object
    ? T[K] extends Date
      ? T[K]
      : T[K] extends Array<infer U>
        ? T[K]
        : ConvertKeysToCamelCase<T[K]>
    : T[K];
};

export function toSnakeCaseKeys<T extends Record<string, any>>(obj: T): ConvertKeysToSnakeCase<T> {
  const result: Record<string, any> = {};
  
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const snakeCaseKey = snakeCase(key);
      const value = obj[key];
      
      // 递归处理嵌套对象
      // Recursively process nested objects
      if (value !== null && typeof value === 'object' && !Array.isArray(value) && !(value as any instanceof Date)) {
        result[snakeCaseKey] = toSnakeCaseKeys(value);
      } else {
        result[snakeCaseKey] = value;
      }
    }
  }
  
  return result as ConvertKeysToSnakeCase<T>;
}

/**
 * 递归地将对象的键从下划线命名转换为驼峰命名
 * Utility function to transform object keys from snake_case to camelCase
 */
export function toCamelCaseKeys<T extends Record<string, any>>(obj: T): ConvertKeysToCamelCase<T> {
  const result: Record<string, any> = {};
  
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const camelCaseKey = camelCase(key);
      const value = obj[key];
      
      // 递归处理嵌套对象
      // Recursively process nested objects
      if (value !== null && typeof value === 'object' && !Array.isArray(value) && !(value as any instanceof Date)) {
        result[camelCaseKey] = toCamelCaseKeys(value);
      } else {
        result[camelCaseKey] = value;
      }
    }
  }
  
  return result as ConvertKeysToCamelCase<T>;
}