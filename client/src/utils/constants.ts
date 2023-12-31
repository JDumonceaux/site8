export const APP_NAME = "React Undone";

export enum SortOrder {
  ASC = "asc",
  DESC = "desc",
}

export enum AcceptHeader {
  GENERAL = "*/*",
  EXCEL = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  // eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
  CSV = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  PDF = "application/pdf",
  ZIP = "application/zip",
}

export enum FileType {
  EXCEL = "xlsx",
  PDF = "pdf",
  CSV = "csv",
  ZIP = "zip",
}

//export const API_ROOT = `${Environment.getPublicUrl()}/api`;
export const API_ROOT = `http://localhost:3005/api`;

export enum ServiceUrl {
  ENDPOINT_MUSIC = `${API_ROOT}/music`,
  ENDPOINT_PHOTOS = `${API_ROOT}/photos`,
  ENDPOINT_TESTGRID = `${API_ROOT}/testgrid`,
}
