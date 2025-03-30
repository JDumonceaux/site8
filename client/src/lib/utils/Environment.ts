/**
 * The Environment utility provides methods to access environment variables.
 */
export const Environment = {
  getApplicationVersion: (): string | undefined =>
    process.env.REACT_APP_VERSION,

  getEnvironment: (): string | undefined => process.env.REACT_APP_ENVIRONMENT,

  getGoogleTagManagerEnvironmentAuth: (): string | undefined =>
    process.env.REACT_APP_GTM_ENV_AUTH,

  getGoogleTagManagerEnvironmentPreview: (): string | undefined =>
    process.env.REACT_APP_GTM_ENV_PREVIEW,

  getGoogleTagManagerId: (): string | undefined => process.env.REACT_APP_GTM_ID,

  getNodeEnvironment: (): string | undefined => process.env.NODE_ENV,

  getPublicUrl: (): string | undefined => process.env.PUBLIC_URL,

  isLocal(): boolean {
    return this.getEnvironment() === 'local';
  },

  isLowerEnvironment(): boolean {
    return !this.isProduction();
  },

  isNearProduction(): boolean {
    return this.isLowerEnvironment() && this.getEnvironment() === 'uat';
  },

  isProduction(): boolean {
    return this.getEnvironment() === 'production';
  },
};
