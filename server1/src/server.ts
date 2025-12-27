import compression from 'compression';
import cors from 'cors';
import express, {
  type NextFunction,
  type Request,
  type Response,
} from 'express';
import RateLimit from 'express-rate-limit';
import helmet from 'helmet';

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
import { musicRouter } from './routes/musicRouter.js';
import { pageRouter } from './routes/pageRouter.js';
import { pagesRouter } from './routes/pagesRouter.js';
import { photosRouter } from './routes/photosRouter.js';
import { testsRouter } from './routes/testsRouter.js';
import { travelRouter } from './routes/travelRouter.js';
import { SERVER_CONFIG } from './utils/constants.js';
import { env } from './utils/env.js';
import { Logger } from './utils/logger.js';

const app = express();

app.set('x-powered-by', false);
app.set('etag', false);

app.use(express.json({ limit: SERVER_CONFIG.JSON_SIZE_LIMIT }));
app.use(
  express.urlencoded({
    extended: true,
    limit: SERVER_CONFIG.JSON_SIZE_LIMIT,
  }),
);
app.use(cors());
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        'script-src': ["'self'"],
      },
    },
    hsts: {
      includeSubDomains: false,
      maxAge: SERVER_CONFIG.HSTS_MAX_AGE,
    },
  }),
);
app.use(compression());

app.use((req, res, next) => {
  res.setTimeout(SERVER_CONFIG.REQUEST_TIMEOUT_MS, () => {
    Logger.warn('Request timeout', { method: req.method, url: req.url });
    res.status(408).send('Request Timeout');
    req.socket.destroy();
  });
  next();
});

// Stricter rate limiter for mutation endpoints (POST, PUT, PATCH, DELETE)
const mutationLimiter = RateLimit({
  legacyHeaders: false,
  max: SERVER_CONFIG.MUTATION_RATE_LIMIT,
  message: 'Mutation rate limit exceeded. Please try again later.',
  standardHeaders: 'draft-7',
  statusCode: 429,
  windowMs: SERVER_CONFIG.RATE_LIMIT_WINDOW_MS,
});

app.use((_req, res, next) => {
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type',
  );
  next();
});
// Read-heavy routes with general rate limiting
app.use('/api/photos', photosRouter);
app.use('/api/bookmarks', bookmarksRouter);
app.use('/api/travel', travelRouter);
app.use('/api/artist', artistRouter);
app.use('/api/artists', artistsRouter);
app.use('/api/generic', genericRouter);
app.use('/api/music', musicRouter);
app.use('/api/pages', pagesRouter);

// Write-heavy routes with stricter mutation rate limiting
app.use('/api/files', filesRouter, mutationLimiter);
app.use('/api/tests', testsRouter, mutationLimiter);
app.use('/api/image', imageRouter, mutationLimiter);
app.use('/api/images', imagesRouter, mutationLimiter);
app.use('/api/items', itemsRouter, mutationLimiter);
app.use('/api/menus', menuRouter, mutationLimiter);
app.use('/api/page', pageRouter, mutationLimiter);
app.use('/api/build', buildRouter, mutationLimiter);

app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
  Logger.error('Unhandled error', { error: err.message, stack: err.stack });
  if (res.headersSent) {
    next(err);
    return;
  }

  // Sanitize error messages in production
  const isDevelopment = env.NODE_ENV === 'development';
  const errorMessage = isDevelopment ? err.message : 'Internal Server Error';

  res.status(500).json({
    error: {
      message: errorMessage,
      ...(isDevelopment && { stack: err.stack }),
    },
  });
});

app.use('*', (_req: Request, res: Response) => {
  res.status(404).send('API Not Found');
});

const server = app.listen(env.PORT, () => {
  Logger.info(`Service is listening on port ${env.PORT}`);
});

server.on('error', (error: Error) => {
  Logger.error(`Failed to start server: ${error.message}`, error);
  throw new Error(`Server startup failed: ${error.message}`);
});
