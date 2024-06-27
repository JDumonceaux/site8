/**
 * Logger utility for handling application logs.
 * @module Logger
 */
import winston from 'winston';
import { Environment } from './Environment.js';

const options = {
  file: {
    level: 'info',
    filename: 'local.log',
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
    timestamp: true,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: true,
    colorize: true,
    timestamp: true,
  },
};

//eslint-disable-next-line
const transports: any[] = [new winston.transports.Console(options.console)];
let winstonFormat = winston.format.json();

if (Environment.isLocal()) {
  transports.push(new winston.transports.File(options.file));
  winstonFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY/MM/DD HH:mm:ss' }),
    winston.format.printf(
      (info) => `[${info.timestamp}] ${info.level}: ${info.message}`,
    ),

    // winston.format.json(),
    // winston.format.prettyPrint()
  );
}

/**
 * The logger instance.
 * @type {winston.Logger}
 */
export const Logger = winston.createLogger({
  level: Environment.isProduction() ? 'info' : 'debug',
  format: winstonFormat,
  transports,
  exitOnError: false,
});

//eslint-disable-next-line
Logger.on('error', (_error: any) => {
  console.info('Logger caught an unhandled error');
});

if (!Environment.isLocal()) {
  console.log('not local');
}
