/* -------------------------------------------------------------------------- */
/*                              Error Messages                                */
/* -------------------------------------------------------------------------- */
export const ERRORS = {
  INTERNAL_SERVER_ERROR: 'Internal Server Error',
  INVALID_ID: 'Invalid ID',
  INVALID_PARAM: 'Invalid Parameter',
  NAME_REQUIRED: 'Name is required',
  NAME_TOO_LONG: 'Name must not exceed {0} characters',
  NOT_FOUND: 'Not Found',
  NO_CONTENT: 'No content found',
  REQUEST_TIMEOUT: 'Request Timeout',
} as const;

/* -------------------------------------------------------------------------- */
/*                            Response Messages                               */
/* -------------------------------------------------------------------------- */
export const RESPONSES = {
  INVALID_ID: 'Invalid ID',
  INVALID_PARAM: 'Invalid Parameter',
  NOT_FOUND: 'Not Found',
  SUCCESS: 'Success',
} as const;

/* -------------------------------------------------------------------------- */
/*                              HTTP Headers                                  */
/* -------------------------------------------------------------------------- */
export const PREFER_HEADER = {
  REPRESENTATION: 'return=representation',
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
  LONG: 'M/d/yyyy h:mm a',
} as const;

/* -------------------------------------------------------------------------- */
/*                              File System                                   */
/* -------------------------------------------------------------------------- */
export const FOLDERS_TO_IGNORE = ['content', 'site'] as const;

/* -------------------------------------------------------------------------- */
/*                              Server Configuration                          */
/* -------------------------------------------------------------------------- */
export const SERVER_CONFIG = {
  HSTS_MAX_AGE: 86_400, // 24 hours in seconds
  JSON_SIZE_LIMIT: '10mb',
  MUTATION_RATE_LIMIT: 30, // mutations per window
  RATE_LIMIT_WINDOW_MS: 15 * 60 * 1000, // 15 minutes
  REQUEST_TIMEOUT_MS: 2000,
} as const;

/* -------------------------------------------------------------------------- */
/*                              Logging Configuration                         */
/* -------------------------------------------------------------------------- */
export const LOG_CONFIG = {
  MAX_LOG_FILE_SIZE: 5_242_880, // 5MB in bytes
  MAX_LOG_FILES: 5,
} as const;

/* -------------------------------------------------------------------------- */
/*                              Validation Limits                             */
/* -------------------------------------------------------------------------- */
export const VALIDATION_LIMITS = {
  MAX_NAME_LENGTH: 255,
  MAX_VERSION_PARTS: 5,
} as const;
