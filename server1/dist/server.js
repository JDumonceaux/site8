import express from 'express';
// import RateLimit from 'express-rate-limit';
import compression from 'compression';
import { Logger } from './utils/Logger.js';
import { pageRouter } from './routes/pageRouter.js';
import { pagesRouter } from './routes/pagesRouter.js';
import { resourcesRouter } from './routes/resourcesRouter.js';
import path from 'path';
const app = express();
app.set('x-powered-by', false);
app.set('etag', false);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: false }));
app.use(compression());
// Add headers before the routes are defined
app.use((_req, res, next) => {
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
const port = 3005;
// Rate limiter not working
// Set up rate limiter: maximum of 100 requests per 15 minutes
// Responds with an HTTP 429 status code
// const limiter = RateLimit({
//   windowMs: 1 * 10 * 60 * 1000, // 10 Minutes
//   max: 100, // max 100 requests per windowMs
//   limit: 100,
//   standardHeaders: 'draft-7',
//   legacyHeaders: false,
//   message: 'You have reached maximum retries. Please try again later',
// });
// // apply rate limiter to all requests
// app.use(limiter);
app.use('/api/menu', menuRouter);
app.use('/api/page', pageRouter);
app.use('/api/pages', pagesRouter);
app.use('/api/resources', resourcesRouter);
app.get('/api/:filename', (req, res) => {
    getFile(req, res, `${req.params.filename}.json`);
});
const getFile = (_req, res, fileName) => {
    const tFileName = fileName;
    const options = {
        root: path.join(__dirname, '../data'),
        timeout: 3000,
    };
    Logger.info(`getFile -> ${tFileName}`);
    res.sendFile(tFileName, options);
};
app.listen(port, () => {
    Logger.info(`Service is listening on port ${port}.`);
});
