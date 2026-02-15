/**
 * HTTP Accept header values
 */
export const AcceptHeader = {
  JSON: "application/json",
} as const;

export type AcceptHeader = (typeof AcceptHeader)[keyof typeof AcceptHeader];

/**
 * HTTP Prefer header values
 */
export const PreferHeader = {
  REPRESENTATION: "return=representation",
} as const;

export type PreferHeader = (typeof PreferHeader)[keyof typeof PreferHeader];
