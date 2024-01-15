"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
// import { LoggingWinston } from '@google-cloud/logging-winston';
var winston_1 = __importDefault(require("winston"));
var Environment_1 = require("../../../client/src/utils/Environment");
// const stackdriver = new LoggingWinston();
//eslint-disable-next-line
var transports = [new winston_1.default.transports.Console()];
var winstonFormat = winston_1.default.format.json();
if (Environment_1.Environment.isLocal()) {
    transports.push(new winston_1.default.transports.File({ filename: 'local.log' }));
    winstonFormat = winston_1.default.format.combine(winston_1.default.format.json());
}
exports.Logger = winston_1.default.createLogger({
    level: Environment_1.Environment.isProduction() ? 'info' : 'debug',
    format: winstonFormat,
    transports: transports,
    exitOnError: false,
});
//eslint-disable-next-line
exports.Logger.on('error', function (error) {
    console.info('Logger caught an unhandled error');
});
if (!Environment_1.Environment.isLocal()) {
    console.log('not local');
    // Logger.add(stackdriver);
}
//# sourceMappingURL=Logger.js.map