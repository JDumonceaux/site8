"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
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
    res.sendFile(tFileName, options);
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
app.get('/api/page/:id', function (req, res) {
    getFile(req, res, "page".concat(req.params.id, ".txt"));
});
app.listen(port, function () {
    console.log("site8 Service is listening on port ".concat(port, "."));
});
//# sourceMappingURL=app.js.map