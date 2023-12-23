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
app.use(express_1.default.json({ limit: '1000mb' }));
app.use(express_1.default.urlencoded({ limit: '1000mb', extended: false }));
// app.get('/api', (req: Request, res: Response) => {
//   res.send('Welcome to Express & TypeScript Server');
// });
app.get('/api', function (req, res) {
    res.set('Access-Control-Allow-Origin', 'http://localhost:5173');
    var fileName = 'restaurants.json';
    var options = {
        root: path.join(__dirname, '../data'),
    };
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log('Sent:', fileName);
        }
    });
});
app.get('/api/music', function (req, res) {
    res.set('Access-Control-Allow-Origin', 'http://localhost:5173');
    var fileName = 'music.json';
    var options = {
        root: path.join(__dirname, '../data'),
    };
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log('Sent:', fileName);
        }
    });
});
app.listen(port, function () {
    console.log("site8 Service is listening on port ".concat(port, "."));
});
//# sourceMappingURL=app.js.map