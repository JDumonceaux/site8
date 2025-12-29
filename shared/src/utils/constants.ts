/* -------------------------------------------------------------------------- */
/*                              Error Messages                                */
/* -------------------------------------------------------------------------- */
export const ERRORS = {
  INTERNAL_SERVER_ERROR: "Internal Server Error",
  INVALID_ID: "Invalid ID",
  INVALID_PARAM: "Invalid Parameter",
  NAME_REQUIRED: "Name is required",
  NAME_TOO_LONG: "Name must not exceed {0} characters",
  NOT_FOUND: "Not Found",
  NO_CONTENT: "No content found",
  REQUEST_TIMEOUT: "Request Timeout",
} as const;

/* -------------------------------------------------------------------------- */
/*                            Response Messages                               */
/* -------------------------------------------------------------------------- */
export const RESPONSES = {
  INVALID_ID: "Invalid ID",
  INVALID_PARAM: "Invalid Parameter",
  NOT_FOUND: "Not Found",
  SUCCESS: "Success",
} as const;

/* -------------------------------------------------------------------------- */
/*                              Regular Expressions                           */
/* -------------------------------------------------------------------------- */
export const REGEX = {
  ALPHANUMERIC_PLUS: /^[a-zA-Z0-9-:;']+$/,
} as const;

/* -------------------------------------------------------------------------- */
/*                              Date Formats                                  */
/* -------------------------------------------------------------------------- */
export const DATE_FORMATS = {
  LONG: "M/d/yyyy h:mm a",
} as const;
