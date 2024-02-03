"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var compression_1 = __importDefault(require("compression"));
var Logger_1 = require("./utils/Logger");
var routes_1 = require("./routes");
var pagesRouter_1 = require("routes/pagesRouter");
var app = (0, express_1.default)();
app.set('x-powered-by', false);
app.set('etag', false);
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ limit: '10mb', extended: false }));
app.use((0, compression_1.default)());
// Add headers before the routes are defined
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.set('Access-Control-Allow-Origin', 'http://localhost:5173');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    //res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});
var port = 3005;
var path = require('path');
app.use('/api/page', routes_1.pageRouter);
app.use('/api/pages', pagesRouter_1.pagesRouter);
app.use('/api/resources', routes_1.resourcesRouter);
app.get('/api/:filename', function (req, res) {
    getFile(req, res, "".concat(req.params.filename, ".json"));
});
function getFile(req, res, fileName) {
    var tFileName = fileName;
    var options = {
        root: path.join(__dirname, '../data'),
        timeout: 3000,
    };
    Logger_1.Logger.info("getFile -> ".concat(tFileName));
    res.sendFile(tFileName, options);
}
app.listen(port, function () {
    Logger_1.Logger.info("Service is listening on port ".concat(port, "."));
});
//# sourceMappingURL=server.js.map