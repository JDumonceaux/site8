export const enum Errors {
  SERVER_ERROR = 'Internal Server Error',
  NO_CONTENT = 'No content found',
}

export const enum Responses {
  SUCCESS = 'Success',
  INVALID_ID = 'Invalid Id',
  INVALID_PARAM = 'Invalid Parementer',
  NOT_FOUND = 'Not Found',
}

export enum PreferHeader {
  REPRESENTATION = 'return=representation',
}

export const enum RegEx {
  ALPHANUMERIC_PLUS = "^[a-zA-Z0-9-:;']+$",
}

export const DF_LONG = 'M/d/yyyy h:mm a';
export const FOLDERS_TO_IGNORE = ['content', 'site'];
