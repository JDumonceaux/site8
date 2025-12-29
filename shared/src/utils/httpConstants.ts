/* -------------------------------------------------------------------------- */
/*                             Request Headers                                */
/* -------------------------------------------------------------------------- */

/**
 * HTTP Accept header values
 */
export const AcceptHeader = {
  JSON: "application/json",
} as const satisfies Record<string, string>;

export type AcceptHeader = (typeof AcceptHeader)[keyof typeof AcceptHeader];

/**
 * HTTP Prefer header values
 */
export const PreferHeader = {
  REPRESENTATION: "return=representation",
} as const satisfies Record<string, string>;

export type PreferHeader = (typeof PreferHeader)[keyof typeof PreferHeader];
