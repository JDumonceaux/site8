export class Environment {
  private static nodeEnv: string = process.env.NODE_ENV ?? 'production';
  private static applicationName: string = process.env.APPLICATION_NAME ?? '';

  /**
   * Get the current Node environment.
   */
  static getNodeEnv(): string {
    return this.nodeEnv;
  }

  /**
   * Get the application name from the environment variables.
   */
  static getApplicationName(): string {
    return this.applicationName;
  }

  /**
   * Check if the environment is 'local'.
   */
  static isLocal(): boolean {
    return this.nodeEnv === 'local';
  }

  /**
   * Check if the environment is 'production'.
   */
  static isProduction(): boolean {
    return this.nodeEnv === 'production';
  }

  /**
   * Check if the environment is non-production (e.g., staging, development, local).
   */
  static isNonProduction(): boolean {
    return !this.isProduction();
  }
}
