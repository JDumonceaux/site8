type NodeEnv = 'local' | 'development' | 'staging' | 'production' | 'test';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class Environment {
  private static readonly APPLICATION_NAME: string =
    process.env.APPLICATION_NAME ?? '';
  private static readonly NODE_ENV: NodeEnv = (process.env.NODE_ENV ??
    'production') as NodeEnv;

  public static getApplicationName(): string {
    return this.APPLICATION_NAME;
  }

  public static getNodeEnv(): NodeEnv {
    return this.NODE_ENV;
  }

  public static isLocal(): boolean {
    return this.NODE_ENV === 'local';
  }

  public static isNonProduction(): boolean {
    return !this.isProduction();
  }

  public static isProduction(): boolean {
    return this.NODE_ENV === 'production';
  }
}
