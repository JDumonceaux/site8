export class Environment {
  static readonly getNodeEnv = (): string => {
    let nodeEnv = process.env.NODE_ENV;

    if (!nodeEnv) {
      nodeEnv = 'production';
    }

    return nodeEnv;
  };

  static readonly getApplicationName = (): string => {
    return process.env.APPLICATION_NAME ?? '';
  };

  static readonly isLocal = (): boolean => {
    return Environment.getNodeEnv() === 'local';
  };

  static readonly isProduction = (): boolean => {
    return Environment.getNodeEnv() === 'production';
  };

  static readonly isLowerEnvironment = () => {
    return !this.isProduction();
  };
}
