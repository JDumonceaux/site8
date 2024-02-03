import express, { Request, Response } from 'express';
import compression from 'compression';
import { Logger } from './utils/Logger';
import { pageRouter, resourcesRouter } from './routes';
import { pagesRouter } from 'routes/pagesRouter';

const app = express();

app.set('x-powered-by', false);
app.set('etag', false);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: false }));
app.use(compression());

// Add headers before the routes are defined
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.set('Access-Control-Allow-Origin', 'http://localhost:5173');
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
const path = require('path');

app.use('/api/page', pageRouter);
app.use('/api/pages', pagesRouter);
app.use('/api/resources', resourcesRouter);

app.get('/api/:filename', (req: Request, res: Response) => {
  getFile(req, res, `${req.params.filename}.json`);
});

function getFile(req: Request, res: Response, fileName: string) {
  const tFileName = fileName;
  const options = {
    root: path.join(__dirname, '../data'),
    timeout: 3000,
  };
  Logger.info(`getFile -> ${tFileName}`);
  res.sendFile(tFileName, options);
}

app.listen(port, () => {
  Logger.info(`Service is listening on port ${port}.`);
});
