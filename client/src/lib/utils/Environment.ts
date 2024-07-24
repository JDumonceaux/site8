/**
 * The `Environment` class provides utility methods to access environment variables.
 */
export class Environment {
  static getApplicationVersion() {
    return process.env.REACT_APP_VERSION;
  }

  static getPublicUrl() {
    return process.env.PUBLIC_URL;
  }

  static getGoogleTagManagerId() {
    return process.env.REACT_APP_GTM_ID;
  }

  static getGoogleTagManagerEnvironmentAuth() {
    return process.env.REACT_APP_GTM_ENV_AUTH;
  }

  static getGoogleTagManagerEnvironmentPreview() {
    return process.env.REACT_APP_GTM_ENV_PREVIEW;
  }

  static getEnvironment() {
    return process.env.REACT_APP_ENVIRONMENT;
  }

  static getNodeEnvironment() {
    return process.env.NODE_ENV;
  }

  static isLocal() {
    return this.getEnvironment() === 'local';
  }

  static isProduction() {
    return this.getEnvironment() === 'production';
  }

  static isLowerEnvironment() {
    return !this.isProduction();
  }

  static isNearProduction() {
    return this.isLowerEnvironment() && this.getEnvironment() === 'uat';
  }
}
