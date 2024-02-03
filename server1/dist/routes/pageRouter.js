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
exports.pageRouter = void 0;
var express_1 = __importDefault(require("express"));
var Logger_1 = require("utils/Logger");
var promises_1 = require("fs/promises");
var getFilePath_1 = require("utils/getFilePath");
exports.pageRouter = express_1.default.Router();
exports.pageRouter.get('/:id', function (req, res) {
    getAllData(req.params.id).then(function (_a) {
        var r0 = _a[0], r1 = _a[1];
        res.json(__assign(__assign({}, r0), { text: r1 }));
    });
});
function getAllData(id) {
    var promise1 = getMetaData(id, (0, getFilePath_1.getFilePath)('pages.json'));
    var promise2 = (0, promises_1.readFile)((0, getFilePath_1.getFilePath)('page' + id + '-en.txt'), {
        encoding: 'utf8',
    });
    return Promise.all([promise1, promise2]);
}
function getMetaData(id, filePath) {
    return (0, promises_1.readFile)(filePath, {
        encoding: 'utf8',
    })
        .then(function (results) {
        return getPage(id, results);
    })
        .catch(function (err) { });
}
function getPage(id, data) {
    try {
        var jsonData = JSON.parse(data);
        var searchId_1 = parseInt(id);
        var ret = jsonData.items.find(function (x) { return x.id === searchId_1; });
        return __assign(__assign({}, jsonData.metadata), { item: ret });
    }
    catch (error) {
        Logger_1.Logger.debug("getPage -> ".concat(error));
    }
}
//# sourceMappingURL=pageRouter.js.map