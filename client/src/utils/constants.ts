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

export const ENDPOINT_GRAPHQL_IMAGES = `http://localhost:4000/images`;

//export const API_ROOT = `${Environment.getPublicUrl()}/api`;
export const API_ROOT = `http://localhost:3005/api`;
//export const API_ROOT = `https://s12k0iq8o1.execute-api.us-west-2.amazonaws.com/Prod/api`;

export enum ServiceUrl {
  ENDPOINT_ART = `${API_ROOT}/art`,
  ENDPOINT_IMAGE = `${API_ROOT}/image`,
  ENDPOINT_IMAGES = `${API_ROOT}/images`,
  ENDPOINT_IMAGES_SCAN = `${API_ROOT}/images/scan`,
  ENDPOINT_MENUS = `${API_ROOT}/menus`,
  ENDPOINT_MENUS_VALUES = `${API_ROOT}/menus/values`,
  ENDPOINT_MUSIC = `${API_ROOT}/music`,
  ENDPOINT_PAGE = `${API_ROOT}/page`,
  ENDPOINT_PAGES = `${API_ROOT}/pages`,
  ENDPOINT_PAGE_CONTENT = `${API_ROOT}/page/content`,
  ENDPOINT_PHOTOS = `${API_ROOT}/photos`,
  ENDPOINT_BOOKMARKS = `${API_ROOT}/bookmarks`,
  ENDPOINT_TESTGRID = `${API_ROOT}/testgrid`,
}

export const REQUIRED_FIELD = 'Required Field';

export const DF_LONG = 'M/d/yyyy h:mm a';

export const IMAGE_BASE = '/images';
