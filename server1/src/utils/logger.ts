/**
 * Logger utility for handling application logs.
 * @module Logger
 */
import winston from 'winston';

import { LOG_CONFIG } from './constants.js';
import { Environment } from './Environment.js';

type FileTransportOptions = {
  readonly colorize: boolean;
  readonly filename: string;
  readonly handleExceptions: boolean;
  readonly json: boolean;
  readonly level: string;
  readonly maxFiles: number;
  readonly maxsize: number;
  readonly timestamp: boolean;
};

type ConsoleTransportOptions = {
  readonly colorize: boolean;
  readonly handleExceptions: boolean;
  readonly json: boolean;
  readonly level: string;
  readonly timestamp: boolean;
};

type LoggerOptions = {
  readonly console: ConsoleTransportOptions;
  readonly file: FileTransportOptions;
};

const OPTIONS: LoggerOptions = {
  console: {
    colorize: true,
    handleExceptions: true,
    json: true,
    level: 'debug',
    timestamp: true,
  },
  file: {
    colorize: false,
    filename: 'local.log',
    handleExceptions: true,
    json: true,
    level: 'info',
    maxFiles: LOG_CONFIG.MAX_LOG_FILES,
    maxsize: LOG_CONFIG.MAX_LOG_FILE_SIZE,
    timestamp: true,
  },
};

const transports: winston.transport[] = [
  new winston.transports.Console(OPTIONS.console),
];

const format = Environment.isLocal()
  ? winston.format.combine(
      winston.format.timestamp({ format: 'YYYY/MM/DD HH:mm:ss' }),
      winston.format.printf(
        (info) =>
          `[${String(info['timestamp'])}] ${String(info.level)}: ${String(info.message)}`,
      ),
    )
  : winston.format.json();

if (Environment.isLocal()) {
  transports.push(new winston.transports.File(OPTIONS.file));
}

export const Logger = winston.createLogger({
  exitOnError: false,
  format,
  level: Environment.isProduction() ? 'info' : 'debug',
  transports,
});

Logger.on('error', (error: Error) => {
  Logger.info('Logger caught an unhandled error', { error: error.message });
});
