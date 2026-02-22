import compression from 'compression';
import cors from 'cors';
import express, {
  type NextFunction,
  type Request,
  type Response,
} from 'express';
import RateLimit from 'express-rate-limit';

import { geminiRouter } from './app/routes/geminiRouter.js';
import { genericRouter } from './app/routes/genericRouter.js';
import { imagesRouter } from './app/routes/imagesRouter.js';
import { menuRouter } from './app/routes/menuRouter.js';
import { testsRouter } from './app/routes/testsRouter.js';
import { travelRouter } from './app/routes/travelRouter.js';
import { SERVER_CONFIG } from './utils/constants.js';
import { env } from './utils/env.js';
import { Logger } from './utils/logger.js';

const isLikelyGeminiApiKey = (apiKey: string): boolean =>
  /^AIza[\w-]{20,}$/.test(apiKey);

const geminiApiKey = env.GEMINI_API_KEY.trim();

if (!geminiApiKey) {
  throw new Error(
    'Startup failed: GEMINI_API_KEY is required. Set it in server1/.env.dev.',
  );
}

if (!isLikelyGeminiApiKey(geminiApiKey)) {
  throw new Error(
    'Startup failed: GEMINI_API_KEY appears malformed. Check server1/.env.dev.',
  );
}

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

// CORS configuration - restrict origins based on environment
const allowedOrigins =
  env.NODE_ENV === 'production'
    ? [env.BASE_URL] // Add production domains as needed
    : [
        'http://localhost:3000',
        'http://localhost:5173',
        'http://localhost:3005',
      ];

app.use(
  cors({
    credentials: true,
    maxAge: 86400, // 24 hours
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, curl, etc.)
      if (!origin) {
        callback(null, true);
        return;
      }
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        Logger.warn(`CORS blocked origin: ${origin}`);
        callback(new Error('Not allowed by CORS'));
      }
    },
  }),
);

app.use(compression());

// Additional security headers
app.use((_req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader(
    'Permissions-Policy',
    'geolocation=(), microphone=(), camera=()',
  );
  next();
});

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
app.use('/api/travel', travelRouter);
app.use('/api/generic', genericRouter);
app.use('/api/images', imagesRouter);
app.use('/api/gemini', geminiRouter);

// Write-heavy routes with stricter mutation rate limiting
app.use('/api/tests', testsRouter, mutationLimiter);
app.use('/api/menus', menuRouter, mutationLimiter);

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
    error: errorMessage,
    ...(isDevelopment && { stack: err.stack }),
  });
});

app.use((_req: Request, res: Response) => {
  res.status(404).send('API Not Found');
});

const server = app.listen(env.PORT, () => {
  Logger.info(`Service is listening on port ${env.PORT}`);
});

server.on('error', (error: Error) => {
  Logger.error(`Failed to start server: ${error.message}`, error);
  throw new Error(`Server startup failed: ${error.message}`);
});
