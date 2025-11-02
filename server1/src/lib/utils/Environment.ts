type NodeEnv = 'local' | 'development' | 'staging' | 'production' | 'test';

export class Environment {
  private static readonly NODE_ENV: NodeEnv = (process.env['NODE_ENV'] ??
    'production') as NodeEnv;
  private static readonly APPLICATION_NAME: string =
    process.env['APPLICATION_NAME'] ?? '';

  static getNodeEnv(): NodeEnv {
    return this.NODE_ENV;
  }

  static getApplicationName(): string {
    return this.APPLICATION_NAME;
  }

  static isLocal(): boolean {
    return this.NODE_ENV === 'local';
  }

  static isProduction(): boolean {
    return this.NODE_ENV === 'production';
  }

  static isNonProduction(): boolean {
    return !this.isProduction();
  }
}
