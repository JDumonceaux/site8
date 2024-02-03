"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resourcesRouter = void 0;
var express_1 = __importDefault(require("express"));
var Logger_1 = require("utils/Logger");
var fs_1 = require("fs");
var getFilePath_1 = require("utils/getFilePath");
exports.resourcesRouter = express_1.default.Router();
exports.resourcesRouter.get('/:id', function (req, res) {
    res.json(getFilteredResources(req.params.id));
});
function getFilteredResources(id) {
    Logger_1.Logger.info("getFilteredResources ->");
    var data = (0, fs_1.readFileSync)((0, getFilePath_1.getFilePath)('resources.json'), 'utf8');
    try {
        var jsonData = JSON.parse(data);
        var searchId_1 = parseInt(id);
        var ret = jsonData.items.filter(function (x) { var _a; return (_a = x.set) === null || _a === void 0 ? void 0 : _a.includes(searchId_1); });
        return __assign(__assign({}, jsonData.metadata), { items: ret });
    }
    catch (error) {
        Logger_1.Logger.debug("getFilteredResources -> ".concat(error));
    }
}
//# sourceMappingURL=resourcesRouter.js.map