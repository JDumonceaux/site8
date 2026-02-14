import type { Request } from 'express';
import type { BaseIssue, BaseSchema } from 'valibot';

export type CrudService<T, TAdd = T> = {
  addItem: (data: TAdd) => Promise<number>;
  deleteItem: (id: number) => Promise<T | undefined>;
  getItem: (id: number) => Promise<T | undefined>;
  patchItem?: (data: T) => Promise<number>;
  updateItem: (data: T) => Promise<number>;
};

export type GetHandlerConfig<T> = {
  errorResponse: T;
  getData: () => Promise<T>;
  getItemCount?: (data: T) => number;
  handlerName: string;
  return204OnEmpty?: boolean;
};

export type GetHandlerWithParamsConfig<T> = {
  errorResponse: T;
  getData: (req: Request) => Promise<T>;
  getItemCount?: (data: T) => number;
  handlerName: string;
  return204OnEmpty?: boolean;
  validateParams?: (req: Request) => {
    errorMessage?: string;
    isValid: boolean;
  };
};

export type PatchOptions<T> = {
  getService: () => Partial<CrudService<T>>;
  idFields?: string[];
  schema: BaseSchema<unknown, T, BaseIssue<unknown>>;
  serviceName: string;
};

export type PostOptions<T, TAdd> = {
  getService: () => Pick<CrudService<T, TAdd>, 'addItem' | 'getItem'>;
  resourcePath: string;
  schema: BaseSchema<unknown, TAdd, BaseIssue<unknown>>;
  serviceName: string;
};

export type PutOptions<T, TAdd> = PostOptions<T, TAdd>;

export type DeleteOptions<T> = {
  getService: () => Pick<CrudService<T>, 'deleteItem'>;
  returnDeleted?: boolean;
  serviceName: string;
};
