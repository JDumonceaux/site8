export const ERRORS = {
  SERVER_ERROR: 'Internal Server Error',
  NO_CONTENT: 'No content found',
} as const;

export const RESPONSES = {
  SUCCESS: 'Success',
  INVALID_ID: 'Invalid ID',
  INVALID_PARAM: 'Invalid Parameter',
  NOT_FOUND: 'Not Found',
} as const;

export const PREFER_HEADER = {
  REPRESENTATION: 'return=representation',
} as const;

export const REGEX = {
  ALPHANUMERIC_PLUS: /^[a-zA-Z0-9-:;']+$/,
} as const;

export const DATE_FORMATS = {
  LONG: 'M/d/yyyy h:mm a',
} as const;

export const FOLDERS_TO_IGNORE = ['content', 'site'] as const;
