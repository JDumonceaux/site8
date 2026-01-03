/* -------------------------------------------------------------------------- */
/*                              Error Messages                                */
/* -------------------------------------------------------------------------- */
// Re-export shared constants
export { DATE_FORMATS, ERRORS, REGEX, RESPONSES } from '@site8/shared';

/* -------------------------------------------------------------------------- */
/*                              HTTP Headers                                  */
/* -------------------------------------------------------------------------- */
// Re-export shared HTTP constants
export { PreferHeader as PREFER_HEADER } from '@site8/shared';

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
