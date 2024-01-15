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

  static getYearsBackToSearchInvoices() {
    return process.env.REACT_APP_YEARS_BACK_TO_SEARCH_INVOICES
      ? parseInt(process.env.REACT_APP_YEARS_BACK_TO_SEARCH_INVOICES)
      : 1;
  }

  static getChangePasswordUrl() {
    return process.env.REACT_APP_CHANGE_PASSWORD_URL;
  }

  static getImageServiceHostAddress() {
    return process.env.REACT_APP_IMAGE_SERVICE_HOST_ADDRESS;
  }

  static getIssuesEnabled() {
    return process.env.REACT_APP_ISSUES_ENABLED === 'true';
  }

  static getDupEnabled() {
    return process.env.REACT_APP_DUP_ENABLED === 'true';
  }

  static getElasticServiceName() {
    return process.env.REACT_APP_ELASTIC_SERVICE_NAME;
  }

  static getElasticServerUrl() {
    return process.env.REACT_APP_ELASTIC_SERVER_URL;
  }

  static getElasticServiceVersion() {
    return process.env.REACT_APP_ELASTIC_SERVICE_VERSION;
  }

  static getElasticEnvironment() {
    return process.env.REACT_APP_ELASTIC_ENVIRONMENT;
  }

  static getElasticEnabled() {
    return process.env.REACT_APP_ELASTIC_ENABLED === 'true';
  }

  // SHOPPING FEATURES
  static getNaturalClaimsEnabled() {
    return process.env.REACT_APP_NATURAL_CLAIMS_ENABLED === 'true';
  }

  static getConventionalClaimsEnabled() {
    return process.env.REACT_APP_CONVENTIONAL_CLAIMS_ENABLED === 'true';
  }

  static isClaimsRedirectEnabled() {
    return process.env.REACT_APP_CLAIMS_REDIRECT_ENABLED === 'true';
  }

  static getInvoicesEnabled() {
    return process.env.REACT_APP_INVOICES_ENABLED === 'true';
  }

  static getXUNFISubEnv() {
    return process.env.X_UNFI_SUB_ENV;
  }

  static getFirebaseApiKey() {
    return process.env.REACT_APP_FIREBASE_API_KEY;
  }

  static getFirebaseAuthDomain() {
    return process.env.REACT_APP_FIREBASE_AUTH_DOMAIN;
  }

  static getFirebaseDatabaseUrl() {
    return process.env.REACT_APP_FIREBASE_DATABASE_URL;
  }

  static getFirebaseProjectId() {
    return process.env.REACT_APP_FIREBASE_PROJECT_ID;
  }

  static getFirebaseStorageBucket() {
    return process.env.REACT_APP_FIREBASE_STORAGE_BUCKET;
  }

  static getFirebaseMessagingSenderId() {
    return process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID;
  }

  static getFirebaseAppId() {
    return process.env.REACT_APP_FIREBASE_APP_ID;
  }

  static getFirebaseMeasurementId() {
    return process.env.REACT_APP_FIREBASE_MEASUREMENT_ID;
  }

  static getIsBulkEnabled() {
    return process.env.REACT_APP_BULK_ENABLED === 'true';
  }

  static getIssuesSectionEnabled() {
    return process.env.REACT_APP_ISSUES_SECTION_ENABLED === 'true';
  }
}
