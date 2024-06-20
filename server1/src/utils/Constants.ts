export const enum Errors {
  SERVER_ERROR = 'Internal Server Error',
  FILE_NOT_FOUND = 'File not found',
  ITEM_NOT_FOUND = 'Item not found',
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
