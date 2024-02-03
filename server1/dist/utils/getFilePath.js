"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilePath = void 0;
var path = require('path');
function getFilePath(fileName) {
    return path.resolve(__dirname, "../../data/".concat(fileName));
}
exports.getFilePath = getFilePath;
//# sourceMappingURL=getFilePath.js.map