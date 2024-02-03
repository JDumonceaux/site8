"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pagesRouter = void 0;
var express_1 = __importDefault(require("express"));
exports.pagesRouter = express_1.default.Router();
var path = require('path');
exports.pagesRouter.get('/', function (req, res) {
    res.sendFile(getFilePath('pages.json'));
});
function getFilePath(fileName) {
    return path.resolve(__dirname, "../../data/".concat(fileName));
}
//# sourceMappingURL=pagesRouter.js.map