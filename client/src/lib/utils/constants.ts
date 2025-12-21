/* -------------------------------------------------------------------------- */
/*                               App Metadata                                 */
/* -------------------------------------------------------------------------- */
export const APP_AUTHOR = 'ReactTotal.io';
export const APP_COPYRIGHT = 'Copyright © 2023 ReactTotal.io';
export const APP_COPYRIGHT_NOTICE = `${APP_COPYRIGHT} ${APP_AUTHOR}`;
export const APP_COPYRIGHT_NOTICE_LONG = `${APP_COPYRIGHT} ${APP_AUTHOR} - All rights reserved.`;
export const APP_COPYRIGHT_YEAR = new Date().getFullYear();
export const APP_DESCRIPTION =
  'ReactTotal.io - React, TypeScript, Node.js, Express, MongoDB';
export const APP_NAME = 'ReactTotal.io';
export const APP_VERSION = '0.0.1';

/* -------------------------------------------------------------------------- */
/*                              Query & Timing                                */
/* -------------------------------------------------------------------------- */
export enum QueryTime {
  FIVE_MINUTES = 1000 * 60 * 5,
  GC_TIME = FIVE_MINUTES,
  ONE_SECOND = 1000,
  REFETCH_INTERVAL = 0,
  RETRY = 3,
  RETRY_DELAY = ONE_SECOND,
  STALE_TIME = FIVE_MINUTES,
  STALE_TIME_PREFETCH = 1000 * 60, // 1 minutes
}

/* -------------------------------------------------------------------------- */
/*                             Request Headers                                */
/* -------------------------------------------------------------------------- */
export enum AcceptHeader {
  JSON = 'application/json',
}
export enum PreferHeader {
  REPRESENTATION = 'return=representation',
}

/* -------------------------------------------------------------------------- */
/*                          API and Route Constants                           */
/* -------------------------------------------------------------------------- */
const API_ROOT = `http://localhost:3005/api`;

export const IMAGE_BASE = '/images';

/* -------------------------------------------------------------------------- */
/*                              Service URLs                                  */
/* -------------------------------------------------------------------------- */
export enum ServiceUrl {
  ENDPOINT_ARTIST_ITEMS = `${API_ROOT}/artist/{0}/items`,
  ENDPOINT_ARTISTS = `${API_ROOT}/artists`,
  ENDPOINT_ARTISTS_ITEMS = `${API_ROOT}/artists/items`,
  ENDPOINT_BOOKMARKS = `${API_ROOT}/bookmarks`,
  ENDPOINT_GENERIC = `${API_ROOT}/generic`,
  ENDPOINT_IMAGE = `${API_ROOT}/image`,
  ENDPOINT_IMAGES = `${API_ROOT}/images`,
  ENDPOINT_IMAGES_EDIT = `${API_ROOT}/images/edit`,
  ENDPOINT_IMAGES_FIX_FILE_NAMES = `${API_ROOT}/images/fix-file-names`,
  ENDPOINT_IMAGES_FIX_INDEX = `${API_ROOT}/images/fix-index`,
  ENDPOINT_IMAGES_FOLDERS = `${API_ROOT}/images/folders`,
  ENDPOINT_IMAGES_LIST_DUPLICATES = `${API_ROOT}/images/list-duplicates`,
  ENDPOINT_IMAGES_SCAN = `${API_ROOT}/images/scan`,
  ENDPOINT_IMAGES_UNMATCHED = `${API_ROOT}/images/unmatched`,
  ENDPOINT_ITEMS = `${API_ROOT}/items`,
  ENDPOINT_MENUS = `${API_ROOT}/menus`,
  ENDPOINT_MENUS_EDIT = `${API_ROOT}/menus/edit`,
  ENDPOINT_MUSIC = `${API_ROOT}/music`,
  ENDPOINT_PAGE = `${API_ROOT}/page`,
  ENDPOINT_PHOTOS = `${API_ROOT}/photos`,
  ENDPOINT_TESTS = `${API_ROOT}/tests`,
  ENDPOINT_TRAVEL = `${API_ROOT}/travel`,
}

/* -------------------------------------------------------------------------- */
/*                              Field Constants                               */
/* -------------------------------------------------------------------------- */
export const AUTH_CODE_LENGTH = 6;
export const MAX_EMAIL_LENGTH = 250;
export const MAX_PASSWORD_LENGTH = 60;
export const MIN_PASSWORD_LENGTH = 8;
export const REQUIRED_FIELD = 'Required Field';
export const SNACKBAR_DEFAULT_DURATION = 3000;

/* -------------------------------------------------------------------------- */
/*                         Authentication Error Messages                      */
/* -------------------------------------------------------------------------- */
export const AUTH_ERROR_MESSAGES = {
  authCodeInvalidType: 'Code must be a string of digits',
  authCodeRequired: 'Code is required.',
  emailInvalidType: 'eMail Address must be a string',
  emailRequired: 'eMail Address is required.',
  maxLengthExceeded: 'Max length exceeded:',
  passwordInvalidType: 'Password must be a string',
  passwordRequired: 'Password is required.',
} as const;

/* -------------------------------------------------------------------------- */
/*                          Default React Query Options                       */
/* -------------------------------------------------------------------------- */
export const USEQUERY_DEFAULT_OPTIONS = {
  gcTime: QueryTime.GC_TIME,
  refetchInterval: QueryTime.REFETCH_INTERVAL,
  refetchIntervalInBackground: false,
  refetchOnMount: false,
  refetchOnReconnect: false,
  refetchOnWindowFocus: false,
  retry: QueryTime.RETRY,
  retryDelay: QueryTime.RETRY_DELAY,
  staleTime: QueryTime.STALE_TIME,
};

export type UseQueryDefaultOptions = typeof USEQUERY_DEFAULT_OPTIONS;
