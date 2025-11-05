/**
 * Logger utility for handling application logs.
 * @module Logger
 */
import winston from 'winston';

import { Environment } from './Environment.js';

type FileTransportOptions = {
  readonly level: string;
  readonly filename: string;
  readonly handleExceptions: boolean;
  readonly json: boolean;
  readonly maxsize: number;
  readonly maxFiles: number;
  readonly colorize: boolean;
  readonly timestamp: boolean;
};

type ConsoleTransportOptions = {
  readonly level: string;
  readonly handleExceptions: boolean;
  readonly json: boolean;
  readonly colorize: boolean;
  readonly timestamp: boolean;
};

type LoggerOptions = {
  readonly file: FileTransportOptions;
  readonly console: ConsoleTransportOptions;
};

const MAX_LOG_FILE_SIZE = 5242880;
const MAX_LOG_FILES = 5;

const OPTIONS: LoggerOptions = {
  file: {
    level: 'info',
    filename: 'local.log',
    handleExceptions: true,
    json: true,
    maxsize: MAX_LOG_FILE_SIZE,
    maxFiles: MAX_LOG_FILES,
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

const transports: winston.transport[] = [
  new winston.transports.Console(OPTIONS.console),
];

let format = winston.format.json();

if (Environment.isLocal()) {
  transports.push(new winston.transports.File(OPTIONS.file));
  format = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY/MM/DD HH:mm:ss' }),
    winston.format.printf(
      (info) => `[${info['timestamp']}] ${info.level}: ${info.message}`,
    ),
  );
}

export const Logger = winston.createLogger({
  level: Environment.isProduction() ? 'info' : 'debug',
  format,
  transports,
  exitOnError: false,
});

Logger.on('error', (error: Error) => {
  Logger.info('Logger caught an unhandled error', { error: error.message });
});
