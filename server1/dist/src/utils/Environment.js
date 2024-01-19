"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Environment = void 0;
var Environment = /** @class */ (function () {
    function Environment() {
    }
    var _a;
    _a = Environment;
    Environment.getNodeEnv = function () {
        var nodeEnv = process.env.NODE_ENV;
        if (!nodeEnv) {
            nodeEnv = 'production';
        }
        return nodeEnv;
    };
    Environment.getApplicationName = function () {
        return process.env.APPLICATION_NAME || '';
    };
    Environment.isLocal = function () {
        return _a.getNodeEnv() === 'local';
    };
    Environment.isProduction = function () {
        return _a.getNodeEnv() === 'production';
    };
    Environment.isLowerEnvironment = function () {
        return !_a.isProduction();
    };
    return Environment;
}());
exports.Environment = Environment;
//# sourceMappingURL=Environment.js.map