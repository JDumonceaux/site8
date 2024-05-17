import express, { Request, Response } from 'express';
// import RateLimit from 'express-rate-limit';
import compression from 'compression';
import cors from 'cors';

import { Logger } from './utils/Logger.js';
import { fileRouter } from './routes/fileRouter.js';
import { menuRouter } from './routes/menuRouter.js';
import { pageRouter } from './routes/pageRouter.js';
import { pagesIndexRouter } from './routes/pagesIndexRouter.js';
import { photosRouter } from './routes/photosRouter.js';
import { bookmarksRouter } from './routes/bookmarksRouter.js';
import { imagesRouter } from './routes/imagesRouter.js';
import { imageRouter } from './routes/imageRouter.js';

const app = express();

app.set('x-powered-by', false);
app.set('etag', false);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cors());
app.use(compression());

// Add headers before the routes are defined
app.use((_req, res, next) => {
  // Website you wish to allow to connect
  // res.set('Access-Control-Allow-Origin', 'http://localhost:5173');
  // Request methods you wish to allow
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE',
  );
  // Request headers you wish to allow
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type',
  );
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

app.use('/api/files', fileRouter);
app.use('/api/menus', menuRouter);
app.use('/api/page', pageRouter);
app.use('/api/pages', pagesIndexRouter);
app.use('/api/photos', photosRouter);
app.use('/api/bookmarks', bookmarksRouter);
app.use('/api/image', imageRouter);
app.use('/api/images', imagesRouter);
app.use('*', (_req: Request, res: Response) => {
  res.status(404).send('API Not Found');
});

app.listen(port, () => {
  Logger.info(`Service is listening on port ${port}.`);
});
