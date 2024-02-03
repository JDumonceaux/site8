"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pagesRouter = void 0;
var express_1 = __importDefault(require("express"));
var getFilePath_1 = require("utils/getFilePath");
exports.pagesRouter = express_1.default.Router();
var path = require('path');
exports.pagesRouter.get('/', function (req, res) {
    res.sendFile((0, getFilePath_1.getFilePath)('pages.json'));
});
//# sourceMappingURL=pagesRouter.js.map