/* eslint-disable no-console */

/**
 * Retrieves the raw environment variable by key.
 * @param key - The name of the environment variable.
 * @returns The variable value or undefined.
 */
const getEnvVar = (key: string): string | undefined => {
  const val = process.env[key];
  if (!val) console.warn(`Environment: missing variable ${key}`);
  return val;
};

/**
 * Provides typed access to common environment variables.
 */
export const Environment = {
  /** Application version from build config */
  getApplicationVersion: (): string | undefined =>
    getEnvVar('REACT_APP_VERSION'),

  /** Deployment environment (e.g., local, uat, production) */
  getEnvironment: (): string | undefined => getEnvVar('REACT_APP_ENVIRONMENT'),

  /** GTM environment authorization token */
  getGoogleTagManagerEnvironmentAuth: (): string | undefined =>
    getEnvVar('REACT_APP_GTM_ENV_AUTH'),

  /** GTM preview environment key */
  getGoogleTagManagerEnvironmentPreview: (): string | undefined =>
    getEnvVar('REACT_APP_GTM_ENV_PREVIEW'),

  /** Google Tag Manager container ID */
  getGoogleTagManagerId: (): string | undefined =>
    getEnvVar('REACT_APP_GTM_ID'),

  /** Node.js environment (development|production|test) */
  getNodeEnvironment: (): string | undefined => getEnvVar('NODE_ENV'),

  /** Public URL root for this app */
  getPublicUrl: (): string | undefined => getEnvVar('PUBLIC_URL'),

  /** Returns true if running in local environment */
  isLocal(): boolean {
    return this.getEnvironment() === 'local';
  },

  /** Returns true for any non-production environment */
  isLowerEnvironment(): boolean {
    return this.getEnvironment() !== 'production';
  },

  /** Returns true if in UAT environment */
  isNearProduction(): boolean {
    return this.getEnvironment() === 'uat';
  },

  /** Returns true if in production environment */
  isProduction(): boolean {
    return this.getEnvironment() === 'production';
  },
};
