export const APP_NAME = 'ReactTotal.io';

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export enum AcceptHeader {
  GENERAL = '*/*',
  EXCEL = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  // eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
  CSV = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  PDF = 'application/pdf',
  ZIP = 'application/zip',
  JSON = 'application/json',
  TEXT = 'text/plain',
  ANY = 'application/json, text/plain, */*',
}

export enum PreferHeader {
  REPRESENTATION = 'return=representation',
}

export enum FileType {
  EXCEL = 'xlsx',
  PDF = 'pdf',
  CSV = 'csv',
  ZIP = 'zip',
}

//const API_ROOT = `${Environment.getPublicUrl()}/api`;
export const API_ROOT = `http://localhost:3005/api`;
//const API_ROOT = `https://s12k0iq8o1.execute-api.us-west-2.amazonaws.com/Prod/api`;

export enum ServiceUrl {
  ENDPOINT_ART = `${API_ROOT}/art`,
  ENDPOINT_IMAGE = `${API_ROOT}/image`,
  ENDPOINT_IMAGES = `${API_ROOT}/images`,
  ENDPOINT_IMAGES_SCAN = `${API_ROOT}/images/scan`,
  ENDPOINT_IMAGES_NEW = `${API_ROOT}/images/new`,
  ENDPOINT_IMAGES_FOLDERS = `${API_ROOT}/images/folders`,
  ENDPOINT_MENUS = `${API_ROOT}/menus`,
  ENDPOINT_MENUS_EDIT = `${API_ROOT}/menus/edit`,
  ENDPOINT_MENUS_ABBR = `${API_ROOT}/menus/abbr`,
  ENDPOINT_MUSIC = `${API_ROOT}/music`,
  ENDPOINT_PAGE = `${API_ROOT}/page`,
  ENDPOINT_PAGE_NAME = `${API_ROOT}/page/name`,
  ENDPOINT_PAGES = `${API_ROOT}/pages`,
  ENDPOINT_PAGE_CONTENT = `${API_ROOT}/page/content`,
  ENDPOINT_PHOTOS = `${API_ROOT}/photos`,
  ENDPOINT_BOOKMARKS = `${API_ROOT}/bookmarks`,
  ENDPOINT_TESTS = `${API_ROOT}/tests`,
  ENDPOINT_GRAPHQL_IMAGES = `http://localhost:4000/images`,
}

export const REQUIRED_FIELD = 'Required Field';

export const DF_LONG = 'M/d/yyyy h:mm a';

export const IMAGE_BASE = '/images';

export const MAX_EMAIL_LENGTH = 250;
export const MIN_PASSWORD_LENGTH = 8;
export const MAX_PASSWORD_LENGTH = 60;
export const AUTH_CODE_LENGTH = 6;

export const AUTH_ERROR_MESSAGES = {
  emailRequired: 'eMail Address is required.',
  emailInvalidType: 'eMail Address must be a string',
  passwordRequired: 'Password is required.',
  passwordInvalidType: 'Password must be a string',
  authCodeRequired: 'Code is required.',
  authCodeInvalidType: 'Code must be a string of digits',
  maxLengthExceeded: 'Max length exceeded:',
};