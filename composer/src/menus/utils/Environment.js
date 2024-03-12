export class Environment {
    static getNodeEnv = () => {
        let nodeEnv = process.env.NODE_ENV;
        if (!nodeEnv) {
            nodeEnv = 'production';
        }
        return nodeEnv;
    };
    static getApplicationName = () => {
        return process.env.APPLICATION_NAME || '';
    };
    static isLocal = () => {
        return Environment.getNodeEnv() === 'local';
    };
    static isProduction = () => {
        return Environment.getNodeEnv() === 'production';
    };
    static isLowerEnvironment = () => {
        return !this.isProduction();
    };
}
