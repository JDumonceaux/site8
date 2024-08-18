export const APP_NAME = 'ReactTotal.io';

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export enum AcceptHeader {
  ANY = 'application/json, text/plain, */*',
  // eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
  CSV = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  EXCEL = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  GENERAL = '*/*',
  JSON = 'application/json',
  PDF = 'application/pdf',
  TEXT = 'text/plain',
  ZIP = 'application/zip',
}

export enum PreferHeader {
  REPRESENTATION = 'return=representation',
}

export enum FileType {
  CSV = 'csv',
  EXCEL = 'xlsx',
  PDF = 'pdf',
  ZIP = 'zip',
}

//const API_ROOT = `${Environment.getPublicUrl()}/api`;
export const API_ROOT = `http://localhost:3005/api`;
//const API_ROOT = `https://s12k0iq8o1.execute-api.us-west-2.amazonaws.com/Prod/api`;

export enum ServiceUrl {
  ENDPOINT_ART = `${API_ROOT}/art`,
  ENDPOINT_BOOKMARKS = `${API_ROOT}/bookmarks`,
  ENDPOINT_GRAPHQL_IMAGES = `http://localhost:4000/images`,
  ENDPOINT_IMAGE = `${API_ROOT}/image`,
  ENDPOINT_IMAGES = `${API_ROOT}/images`,
  ENDPOINT_IMAGES_FOLDERS = `${API_ROOT}/images/folders`,
  ENDPOINT_IMAGES_NEW = `${API_ROOT}/images/new`,
  ENDPOINT_IMAGES_SCAN = `${API_ROOT}/images/scan`,
  ENDPOINT_MENUS = `${API_ROOT}/menus`,
  ENDPOINT_MENUS_ABBR = `${API_ROOT}/menus/abbr`,
  ENDPOINT_MENUS_EDIT = `${API_ROOT}/menus/edit`,
  ENDPOINT_MUSIC = `${API_ROOT}/music`,
  ENDPOINT_PAGE = `${API_ROOT}/page`,
  ENDPOINT_PAGE_CONTENT = `${API_ROOT}/page/content`,
  ENDPOINT_PAGE_NAME = `${API_ROOT}/page/name`,
  ENDPOINT_PAGES = `${API_ROOT}/pages`,
  ENDPOINT_PHOTOS = `${API_ROOT}/photos`,
  ENDPOINT_TESTS = `${API_ROOT}/tests`,
}

export const REQUIRED_FIELD = 'Required Field';

export const DF_LONG = 'M/d/yyyy h:mm a';

export const IMAGE_BASE = '/images';

export const MAX_EMAIL_LENGTH = 250;
export const MIN_PASSWORD_LENGTH = 8;
export const MAX_PASSWORD_LENGTH = 60;
export const AUTH_CODE_LENGTH = 6;

export const AUTH_ERROR_MESSAGES = {
  authCodeInvalidType: 'Code must be a string of digits',
  authCodeRequired: 'Code is required.',
  emailInvalidType: 'eMail Address must be a string',
  emailRequired: 'eMail Address is required.',
  maxLengthExceeded: 'Max length exceeded:',
  passwordInvalidType: 'Password must be a string',
  passwordRequired: 'Password is required.',
};
