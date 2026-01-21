/* -------------------------------------------------------------------------- */
/*                               App Metadata                                 */
/* -----------------------------------------------------------------U--------- */
export const APP_AUTHOR = 'ReactTotal.io';
export const APP_COPYRIGHT = 'Copyright © 2026 ReactTotal.io';
export const APP_COPYRIGHT_NOTICE = `${APP_COPYRIGHT} ${APP_AUTHOR}`;
export const APP_COPYRIGHT_NOTICE_LONG = `${APP_COPYRIGHT} ${APP_AUTHOR} - All rights reserved.`;
export const APP_COPYRIGHT_YEAR = new Date().getFullYear();
export const APP_DESCRIPTION = 'ReactTotal.io - React, TypeScript, Node.js';
export const APP_NAME = 'ReactTotal.io';
export const APP_VERSION = '0.0.1';

/* -------------------------------------------------------------------------- */
/*                              Query & Timing                                */
/* -------------------------------------------------------------------------- */
export const QueryTime = {
  FIVE_MINUTES: 1000 * 60 * 5,
  ONE_SECOND: 1000,
  REFETCH_INTERVAL: 0,
  RETRY: 3,
} as const satisfies Record<string, number>;

export const QueryTimeComputed = {
  GC_TIME: QueryTime.FIVE_MINUTES,
  RETRY_DELAY: QueryTime.ONE_SECOND,
  STALE_TIME: QueryTime.FIVE_MINUTES,
  STALE_TIME_PREFETCH: 1000 * 60, // 1 minute
} as const satisfies Record<string, number>;

export type QueryTimeValue = (typeof QueryTime)[keyof typeof QueryTime];
export type QueryTimeComputedValue =
  (typeof QueryTimeComputed)[keyof typeof QueryTimeComputed];

/* -------------------------------------------------------------------------- */
/*                             Request Headers                                */
/* -------------------------------------------------------------------------- */
// Moved to @site8/shared
export { AcceptHeader, PreferHeader } from '@site8/shared';
export type {
  AcceptHeader as AcceptHeaderType,
  PreferHeader as PreferHeaderType,
} from '@site8/shared';

/* -------------------------------------------------------------------------- */
/*                          API and Route Constants                           */
/* -------------------------------------------------------------------------- */
const API_ROOT: string =
  (import.meta.env.VITE_API_URL as string | undefined) ??
  'http://localhost:3005/api';

export const IMAGE_BASE = '/images';

/* -------------------------------------------------------------------------- */
/*                              Service URLs                                  */
/* -------------------------------------------------------------------------- */
export const ServiceUrl = {
  ENDPOINT_GENERIC: `${API_ROOT}/generic`,
  ENDPOINT_MENUS: `${API_ROOT}/menus`,
  ENDPOINT_MENUS_EDIT: `${API_ROOT}/menus/edit`,
  ENDPOINT_PAGE: `${API_ROOT}/page`,
  ENDPOINT_TESTS: `${API_ROOT}/tests`,
  ENDPOINT_TESTS_AI: `${API_ROOT}/tests/ai`,
  ENDPOINT_TESTS_GROUPS: `${API_ROOT}/tests/groups`,
  ENDPOINT_TRAVEL: `${API_ROOT}/travel`,
} as const satisfies Record<string, string>;

export type ServiceUrlValue = (typeof ServiceUrl)[keyof typeof ServiceUrl];

// Dynamic endpoint helpers
export const ENDPOINT_TEST_UPDATE = (id: number): string =>
  `${API_ROOT}/tests/${id}`;
export const ENDPOINT_TEST_DELETE = (id: number): string =>
  `${API_ROOT}/tests/${id}`;

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
/*                              UI Component Defaults                         */
/* -------------------------------------------------------------------------- */
export const UI_DEFAULTS = {
  AVATAR_DEFAULT_DELAY: 600,
  AVATAR_DEFAULT_SIZE: 40,
  FALLBACK_DEFAULT_LINES: 5,
  FALLBACK_MAX_LINES: 20,
  FALLBACK_MIN_LINES: 1,
} as const;

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
/*                             Form Constants                                 */
/* -------------------------------------------------------------------------- */
export const FORM_CONSTANTS = {
  CODE_CONTENT_ROWS: 6,
  COMMENTS_ROWS: 4,
  DEFAULT_CODE_TYPE: 'javascript',
} as const;

/* -------------------------------------------------------------------------- */
/*                          Default React Query Options                       */
/* -------------------------------------------------------------------------- */
export const USEQUERY_DEFAULT_OPTIONS = {
  gcTime: QueryTimeComputed.GC_TIME,
  refetchInterval: QueryTime.REFETCH_INTERVAL,
  refetchIntervalInBackground: false,
  refetchOnMount: false,
  refetchOnReconnect: false,
  refetchOnWindowFocus: false,
  retry: QueryTime.RETRY,
  retryDelay: QueryTimeComputed.RETRY_DELAY,
  staleTime: QueryTimeComputed.STALE_TIME,
};

export type UseQueryDefaultOptions = typeof USEQUERY_DEFAULT_OPTIONS;
