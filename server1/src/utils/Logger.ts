import winston from 'winston';
import { Environment } from './Environment';

//eslint-disable-next-line
const transports: any[] = [new winston.transports.Console()];
let winstonFormat = winston.format.json();

if (Environment.isLocal()) {
  transports.push(new winston.transports.File({ filename: 'local.log' }));
  winstonFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY/MM/DD HH:mm:ss' }),
    winston.format.printf(
      (info) => `[${info.timestamp}] ${info.level}: ${info.message}`,
    ),
    // winston.format.json(),
    // winston.format.prettyPrint()
  );
}

export const Logger = winston.createLogger({
  level: Environment.isProduction() ? 'info' : 'debug',
  format: winstonFormat,
  transports,
  exitOnError: false,
});

//eslint-disable-next-line
Logger.on('error', (error: any) => {
  console.info('Logger caught an unhandled error');
});

if (!Environment.isLocal()) {
  console.log('not local');
}
