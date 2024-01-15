import express, { Request, Response } from 'express';
import { Logger } from './utils/Logger';
import { readFileSync } from 'fs';

const port = process.env.PORT ?? 3005; // default port to listen
const path = require('path');
const app = express();

app.set('x-powered-by', false);
app.set('etag', false);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: false }));

function getFile(req: Request, res: Response, fileName: string) {
  res.set('Access-Control-Allow-Origin', 'http://localhost:5173');
  const tFileName = fileName;
  const options = {
    root: path.join(__dirname, '../data'),
    timeout: 3000,
  };
  Logger.info(`getFile -> ${tFileName}`);
  res.sendFile(tFileName, options);
}

function getFilteredResources(req: Request, res: Response, id: string) {
  res.set('Access-Control-Allow-Origin', 'http://localhost:5173');
  const tFileName = 'resources.json';
  const options = {
    root: path.join(__dirname, '../data'),
    timeout: 3000,
  };
  Logger.info(`getFilteredFile -> ${tFileName}`);

  const data = readFileSync('./config.json');

  res.json(data);
}

app.get('/api/cool', (req: Request, res: Response) => {
  getFile(req, res, 'cool.json');
});

app.get('/api/music', (req: Request, res: Response) => {
  getFile(req, res, 'music.json');
});

app.get('/api/photos', (req: Request, res: Response) => {
  getFile(req, res, 'photos.json');
});

app.get('/api/restaurants', (req: Request, res: Response) => {
  getFile(req, res, 'restaurants.json');
});

app.get('/api/testgrid', (req: Request, res: Response) => {
  getFile(req, res, 'testgrid.json');
});

app.get('/api/:filename', (req: Request, res: Response) => {
  getFile(req, res, `${req.params.filename}.json`);
});

app.get('/api/page/:id', (req: Request, res: Response) => {
  getFile(req, res, `page${req.params.id}.txt`);
});

app.get('/api/resources/:id', (req: Request, res: Response) => {
  getFilteredResources(req, res, req.params.id);
});

app.listen(port, () => {
  console.log(`site8 Service is listening on port ${port}.`);
});
