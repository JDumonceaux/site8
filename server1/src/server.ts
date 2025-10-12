import compression from 'compression';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import RateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { env } from './lib/env.js';
import { Logger } from './lib/utils/logger.js';
import { artistRouter } from './routes/artistRouter.js';
import { artistsRouter } from './routes/artistsRouter.js';
import { bookmarksRouter } from './routes/bookmarksRouter.js';
import { buildRouter } from './routes/buildRouter.js';
import { filesRouter } from './routes/filesRouter.js';
import { genericRouter } from './routes/genericRouter.js';
import { imageRouter } from './routes/imageRouter.js';
import { imagesRouter } from './routes/imagesRouter.js';
import { itemsRouter } from './routes/itemsRouter.js';
import { menuRouter } from './routes/menuRouter.js';
import { pageRouter } from './routes/pageRouter.js';
import { pagesRouter } from './routes/pagesRouter.js';
import { photosRouter } from './routes/photosRouter.js';
import { testsRouter } from './routes/testsRouter.js';

const REQUEST_TIMEOUT_MS = 2000;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 100;
const JSON_SIZE_LIMIT = '10mb';
const HSTS_MAX_AGE = 86400;

const app = express();

app.set('x-powered-by', false);
app.set('etag', false);

app.use(express.json({ limit: JSON_SIZE_LIMIT }));
app.use(express.urlencoded({ limit: JSON_SIZE_LIMIT, extended: true }));
app.use(cors());
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        'script-src': ["'self'"],
      },
    },
    hsts: {
      maxAge: HSTS_MAX_AGE,
      includeSubDomains: false,
    },
  }),
);
app.use(compression());

app.use((req, res, next) => {
  res.setTimeout(REQUEST_TIMEOUT_MS, () => {
    Logger.warn('Request has timed out', { url: req.url, method: req.method });
    res.status(408).send('Request Timeout');
    req.socket.destroy();
  });
  next();
});

const limiter = RateLimit({
  windowMs: RATE_LIMIT_WINDOW_MS,
  max: RATE_LIMIT_MAX_REQUESTS,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  statusCode: 429,
  message: 'Rate limit reached',
});

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
app.use('/api/artist', artistRouter);
app.use('/api/artists', artistsRouter);
app.use('/api/generic', genericRouter);
app.use('/api/image', imageRouter);
app.use('/api/images', imagesRouter);
app.use('/api/items', itemsRouter);
app.use('/api/menus', menuRouter);
app.use('/api/page', pageRouter, limiter);
app.use('/api/pages', pagesRouter);
app.use('/api/build', buildRouter);

app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
  Logger.error('Error occurred', { error: err.message, stack: err.stack });
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ error: { message: 'Internal Server Error' } });
});

app.use('*', (_req: Request, res: Response) => {
  res.status(404).send('API Not Found');
});

const server = app.listen(env.PORT, () => {
  Logger.info(`Service is listening on port ${env.PORT}`);
});

server.on('error', (error: Error) => {
  Logger.error(`Failed to start server: ${error.message}`, { error });
  process.exit(1);
});
