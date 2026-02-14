/**
 * Retrieves the raw environment variable by key.
 * @param key - The name of the environment variable.
 * @returns The variable value or undefined.
 */
// eslint-disable-next-line unicorn/prevent-abbreviations
const getEnvVar = (key: string): string | undefined => {
  const env = import.meta.env as Record<string, unknown>;
  const candidateKeys = new Set<string>([key]);

  if (key.startsWith('REACT_APP_')) {
    candidateKeys.add(key.replace('REACT_APP_', 'VITE_'));
  }

  if (key === 'PUBLIC_URL') {
    candidateKeys.add('BASE_URL');
  }

  const value = [...candidateKeys]
    .map((candidateKey) => env[candidateKey])
    .find(
      (candidateValue): candidateValue is string =>
        typeof candidateValue === 'string' && candidateValue.length > 0,
    );

  if (value == null) console.warn(`Environment: missing variable ${key}`);

  return value;
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
  getNodeEnvironment: (): string | undefined => import.meta.env.MODE,

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
