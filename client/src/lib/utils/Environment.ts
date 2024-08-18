/**
 * The `Environment` class provides utility methods to access environment variables.
 */
export const Environment = {
  getApplicationVersion: () => process.env.REACT_APP_VERSION,

  getEnvironment: () => process.env.REACT_APP_ENVIRONMENT,

  getGoogleTagManagerEnvironmentAuth: () => process.env.REACT_APP_GTM_ENV_AUTH,

  getGoogleTagManagerEnvironmentPreview: () =>
    process.env.REACT_APP_GTM_ENV_PREVIEW,

  getGoogleTagManagerId: () => process.env.REACT_APP_GTM_ID,

  getNodeEnvironment: () => process.env.NODE_ENV,

  getPublicUrl: () => process.env.PUBLIC_URL,

  isLocal: () => Environment.getEnvironment() === 'local',

  isLowerEnvironment: () => !Environment.isProduction(),

  isNearProduction: () =>
    Environment.isLowerEnvironment() && Environment.getEnvironment() === 'uat',

  isProduction: () => Environment.getEnvironment() === 'production',
};
