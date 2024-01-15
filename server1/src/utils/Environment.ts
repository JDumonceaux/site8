export class Environment {
  static getNodeEnv = (): string => {
    let nodeEnv = process.env.NODE_ENV;

    if (!nodeEnv) {
      nodeEnv = 'production';
    }

    return nodeEnv;
  };

  static getApplicationName = (): string => {
    return process.env.APPLICATION_NAME || '';
  };

  static isLocal = (): boolean => {
    return Environment.getNodeEnv() === 'local';
  };

  static isProduction = (): boolean => {
    return Environment.getNodeEnv() === 'production';
  };

  static isLowerEnvironment = () => {
    return !this.isProduction();
  };
}
