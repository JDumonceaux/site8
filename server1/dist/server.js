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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var Logger_1 = require("./utils/Logger");
var fs_1 = require("fs");
var port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3005; // default port to listen
var path = require('path');
var app = (0, express_1.default)();
app.set('x-powered-by', false);
app.set('etag', false);
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ limit: '10mb', extended: false }));
function getFile(req, res, fileName) {
    res.set('Access-Control-Allow-Origin', 'http://localhost:5173');
    var tFileName = fileName;
    var options = {
        root: path.join(__dirname, '../data'),
        timeout: 3000,
    };
    Logger_1.Logger.info("getFile -> ".concat(tFileName));
    res.sendFile(tFileName, options);
}
function getFilteredResources(req, res, id) {
    res.set('Access-Control-Allow-Origin', 'http://localhost:5173');
    var tFileName = 'resources.json';
    Logger_1.Logger.info("getFilteredResources -> ".concat(tFileName));
    var data = (0, fs_1.readFileSync)(path.resolve(__dirname, "../data/".concat(tFileName)), 'utf8');
    try {
        var jsonData = JSON.parse(data);
        var searchId_1 = parseInt(id);
        var ret = jsonData.items.filter(function (x) { var _a; return (_a = x.set) === null || _a === void 0 ? void 0 : _a.includes(searchId_1); });
        res.json(__assign(__assign({}, jsonData.metadata), { items: ret }));
    }
    catch (error) {
        Logger_1.Logger.debug("getFilteredResources -> ".concat(error));
    }
}
function getPageMeta(req, res, id) {
    res.set('Access-Control-Allow-Origin', 'http://localhost:5173');
    var tFileName = 'pages.json';
    Logger_1.Logger.info("getPageMeta -> ".concat(tFileName));
    var data = (0, fs_1.readFileSync)(path.resolve(__dirname, "../data/".concat(tFileName)), 'utf8');
    try {
        var jsonData = JSON.parse(data);
        var searchId_2 = parseInt(id);
        var ret = jsonData.items.filter(function (x) { return x.id === searchId_2; });
        res.json(__assign(__assign({}, jsonData.metadata), { items: ret }));
    }
    catch (error) {
        Logger_1.Logger.debug("getPageMeta -> ".concat(error));
    }
}
app.get('/api/cool', function (req, res) {
    getFile(req, res, 'cool.json');
});
app.get('/api/music', function (req, res) {
    getFile(req, res, 'music.json');
});
app.get('/api/photos', function (req, res) {
    getFile(req, res, 'photos.json');
});
app.get('/api/restaurants', function (req, res) {
    getFile(req, res, 'restaurants.json');
});
app.get('/api/testgrid', function (req, res) {
    getFile(req, res, 'testgrid.json');
});
app.get('/api/:filename', function (req, res) {
    getFile(req, res, "".concat(req.params.filename, ".json"));
});
app.get('/api/page/content/:id', function (req, res) {
    getFile(req, res, "page".concat(req.params.id, ".txt"));
});
app.get('/api/page/:id', function (req, res) {
    getPageMeta(req, res, req.params.id);
});
app.get('/api/resources/:id', function (req, res) {
    getFilteredResources(req, res, req.params.id);
});
app.listen(port, function () {
    console.log("Service is listening on port ".concat(port, "."));
});
//# sourceMappingURL=server.js.map