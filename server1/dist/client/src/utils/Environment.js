"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Environment = void 0;
var Environment = /** @class */ (function () {
    function Environment() {
    }
    Environment.getApplicationVersion = function () {
        return process.env.REACT_APP_VERSION;
    };
    Environment.getPublicUrl = function () {
        return process.env.PUBLIC_URL;
    };
    Environment.getGoogleTagManagerId = function () {
        return process.env.REACT_APP_GTM_ID;
    };
    Environment.getGoogleTagManagerEnvironmentAuth = function () {
        return process.env.REACT_APP_GTM_ENV_AUTH;
    };
    Environment.getGoogleTagManagerEnvironmentPreview = function () {
        return process.env.REACT_APP_GTM_ENV_PREVIEW;
    };
    Environment.getEnvironment = function () {
        return process.env.REACT_APP_ENVIRONMENT;
    };
    Environment.getNodeEnvironment = function () {
        return process.env.NODE_ENV;
    };
    Environment.isLocal = function () {
        return this.getEnvironment() === 'local';
    };
    Environment.isProduction = function () {
        return this.getEnvironment() === 'production';
    };
    Environment.isLowerEnvironment = function () {
        return !this.isProduction();
    };
    Environment.isNearProduction = function () {
        return this.isLowerEnvironment() && this.getEnvironment() === 'uat';
    };
    Environment.getYearsBackToSearchInvoices = function () {
        return process.env.REACT_APP_YEARS_BACK_TO_SEARCH_INVOICES
            ? parseInt(process.env.REACT_APP_YEARS_BACK_TO_SEARCH_INVOICES)
            : 1;
    };
    Environment.getChangePasswordUrl = function () {
        return process.env.REACT_APP_CHANGE_PASSWORD_URL;
    };
    Environment.getImageServiceHostAddress = function () {
        return process.env.REACT_APP_IMAGE_SERVICE_HOST_ADDRESS;
    };
    Environment.getIssuesEnabled = function () {
        return process.env.REACT_APP_ISSUES_ENABLED === 'true';
    };
    Environment.getDupEnabled = function () {
        return process.env.REACT_APP_DUP_ENABLED === 'true';
    };
    Environment.getElasticServiceName = function () {
        return process.env.REACT_APP_ELASTIC_SERVICE_NAME;
    };
    Environment.getElasticServerUrl = function () {
        return process.env.REACT_APP_ELASTIC_SERVER_URL;
    };
    Environment.getElasticServiceVersion = function () {
        return process.env.REACT_APP_ELASTIC_SERVICE_VERSION;
    };
    Environment.getElasticEnvironment = function () {
        return process.env.REACT_APP_ELASTIC_ENVIRONMENT;
    };
    Environment.getElasticEnabled = function () {
        return process.env.REACT_APP_ELASTIC_ENABLED === 'true';
    };
    // SHOPPING FEATURES
    Environment.getNaturalClaimsEnabled = function () {
        return process.env.REACT_APP_NATURAL_CLAIMS_ENABLED === 'true';
    };
    Environment.getConventionalClaimsEnabled = function () {
        return process.env.REACT_APP_CONVENTIONAL_CLAIMS_ENABLED === 'true';
    };
    Environment.isClaimsRedirectEnabled = function () {
        return process.env.REACT_APP_CLAIMS_REDIRECT_ENABLED === 'true';
    };
    Environment.getInvoicesEnabled = function () {
        return process.env.REACT_APP_INVOICES_ENABLED === 'true';
    };
    Environment.getXUNFISubEnv = function () {
        return process.env.X_UNFI_SUB_ENV;
    };
    Environment.getFirebaseApiKey = function () {
        return process.env.REACT_APP_FIREBASE_API_KEY;
    };
    Environment.getFirebaseAuthDomain = function () {
        return process.env.REACT_APP_FIREBASE_AUTH_DOMAIN;
    };
    Environment.getFirebaseDatabaseUrl = function () {
        return process.env.REACT_APP_FIREBASE_DATABASE_URL;
    };
    Environment.getFirebaseProjectId = function () {
        return process.env.REACT_APP_FIREBASE_PROJECT_ID;
    };
    Environment.getFirebaseStorageBucket = function () {
        return process.env.REACT_APP_FIREBASE_STORAGE_BUCKET;
    };
    Environment.getFirebaseMessagingSenderId = function () {
        return process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID;
    };
    Environment.getFirebaseAppId = function () {
        return process.env.REACT_APP_FIREBASE_APP_ID;
    };
    Environment.getFirebaseMeasurementId = function () {
        return process.env.REACT_APP_FIREBASE_MEASUREMENT_ID;
    };
    Environment.getIsBulkEnabled = function () {
        return process.env.REACT_APP_BULK_ENABLED === 'true';
    };
    Environment.getIssuesSectionEnabled = function () {
        return process.env.REACT_APP_ISSUES_SECTION_ENABLED === 'true';
    };
    return Environment;
}());
exports.Environment = Environment;
//# sourceMappingURL=Environment.js.map