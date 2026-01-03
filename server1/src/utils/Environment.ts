type NodeEnv = 'local' | 'development' | 'staging' | 'production' | 'test';

export class Environment {
  private static readonly APPLICATION_NAME: string =
    process.env['APPLICATION_NAME'] ?? '';
  private static readonly NODE_ENV: NodeEnv = (process.env['NODE_ENV'] ??
    'production') as NodeEnv;

  static getApplicationName(): string {
    return this.APPLICATION_NAME;
  }

  static getNodeEnv(): NodeEnv {
    return this.NODE_ENV;
  }

  static isLocal(): boolean {
    return this.NODE_ENV === 'local';
  }

  static isNonProduction(): boolean {
    return !this.isProduction();
  }

  static isProduction(): boolean {
    return this.NODE_ENV === 'production';
  }
}
