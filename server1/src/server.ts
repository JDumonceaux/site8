import compression from 'compression';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import RateLimit from 'express-rate-limit';

import helmet from 'helmet';
import { Logger } from './lib/utils/logger.js';
import { bookmarksRouter } from './routes/bookmarksRouter.js';
import { filesRouter } from './routes/filesRouter.js';
import { imageRouter } from './routes/imageRouter.js';
import { imagesRouter } from './routes/imagesRouter.js';
import { itemsRouter } from './routes/itemsRouter.js';
import { menuRouter } from './routes/menuRouter.js';
import { pageRouter } from './routes/pageRouter.js';
import { pagesRouter } from './routes/pagesRouter.js';
import { photosRouter } from './routes/photosRouter.js';
import { testsRouter } from './routes/testsRouter.js';
import { artistsRouter } from './routes/artistsRouter.js';
import { artistRouter } from './routes/artistRouter.js';
import { buildRouter } from './routes/buildRouter.js';

const app = express();

app.set('x-powered-by', false);
app.set('etag', false);

// Setup
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cors());
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        'script-src': ['"self"', 'example.com'],
      },
    },
    hsts: {
      maxAge: 86400,
      includeSubDomains: false,
    },
  }),
);
app.use(compression());
// Add timeout to all requests
app.use((req, res, next) => {
  res.setTimeout(2000, () => {
    console.log('Request has timed out.');
    res.status(408).send('Request Timeout');
    req.destroy();
  });
  next();
});

// app.use((_req, res, next) => {
//   // Website you wish to allow to connect
//   // res.set('Access-Control-Allow-Origin', 'http://localhost:5173');
//   // Request methods you wish to allow
//   res.setHeader(
//     'Access-Control-Allow-Methods',
//     'GET, POST, OPTIONS, PUT, PATCH, DELETE',
//   );
//   // Request headers you wish to allow
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'X-Requested-With,content-type',
//   );
//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   //res.setHeader('Access-Control-Allow-Credentials', true);
//   // Pass to next layer of middleware
//   next();
// });

const port = process.env.PORT || 3005;

// set up rate limiter
const limiter = RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requests per windowMs
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  statusCode: 429,
  message: 'Rate limit reached',
});
// app.use(limiter);

app.use((_req, res, next) => {
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type',
  );
  next();
});
app.use('/api/files', filesRouter, limiter);
app.use('/api/photos', photosRouter);
app.use('/api/tests', testsRouter, limiter);
app.use('/api/bookmarks', bookmarksRouter);
// app.use((_req, res, next) => {
//   res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, PATCH, DELETE');
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'X-Requested-With,content-type',
//   );
//   next();
// });
app.use('/api/artist', artistRouter);
app.use('/api/artists', artistsRouter);
app.use('/api/image', imageRouter);
app.use('/api/images', imagesRouter);
app.use('/api/items', itemsRouter);
app.use('/api/menus', menuRouter);
app.use('/api/page', pageRouter, limiter);
app.use('/api/pages', pagesRouter);

app.use('/api/build', buildRouter);

// error handler
app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
  Logger.error(`Error: ${err.message}`);
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json(err.message);
});

app.use('*', (_req: Request, res: Response) => {
  res.status(404).send('API Not Found');
});

app.listen(port, (err?: Error) => {
  if (err) {
    Logger.error(`Failed to start server: ${err.message}`);
    process.exit(1);
  } else {
    Logger.info(`Service is listening on port ${port}.`);
  }
});
