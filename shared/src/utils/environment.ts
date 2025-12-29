/**
 * Common environment type values
 */
export type EnvironmentType =
  | "local"
  | "development"
  | "staging"
  | "uat"
  | "production"
  | "test";

/**
 * Shared environment utility functions
 */
export const EnvironmentUtils = {
  /**
   * Checks if the current environment is local
   * @param env - Environment string to check
   */
  isLocal(env: string | undefined): boolean {
    return env === "local";
  },

  /**
   * Checks if the current environment is production
   * @param env - Environment string to check
   */
  isProduction(env: string | undefined): boolean {
    return env === "production";
  },

  /**
   * Checks if the current environment is non-production
   * @param env - Environment string to check
   */
  isNonProduction(env: string | undefined): boolean {
    return !this.isProduction(env);
  },

  /**
   * Checks if the current environment is lower (non-production)
   * @param env - Environment string to check
   */
  isLowerEnvironment(env: string | undefined): boolean {
    return this.isNonProduction(env);
  },
} as const;
