export type Exception = {
  readonly statusCode: number;
  readonly id?: string;
  readonly message?: string;
  readonly details?: string;
};
