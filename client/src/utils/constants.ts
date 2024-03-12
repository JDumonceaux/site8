export const APP_NAME = 'React Notes';

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
}

export enum FileType {
  EXCEL = 'xlsx',
  PDF = 'pdf',
  CSV = 'csv',
  ZIP = 'zip',
}

//export const API_ROOT = `${Environment.getPublicUrl()}/api`;
export const API_ROOT = `http://localhost:3005/api`;

export enum ServiceUrl {
  ENDPOINT_ART = `${API_ROOT}/art`,
  ENDPOINT_MENUS = `${API_ROOT}/menus`,
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
