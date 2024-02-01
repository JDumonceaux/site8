import express, { Request, Response } from 'express';
import { Logger } from 'utils/Logger';
import { readFile } from 'fs/promises';
import { IPages } from 'models/resources/IPage';

export const pagesRouter = express.Router();
const path = require('path');

pagesRouter.get('/:id', (req: Request, res: Response) => {
  getAllData(req.params.id).then(([r0, r1]) => {
    res.json({ ...r0, text: r1 });
  });
});

function getAllData(id: string) {
  const promise1 = getMetaData(id, getFilePath('pages.json'));
  const promise2 = readFile(getFilePath('page' + id + '-en.txt'), {
    encoding: 'utf8',
  });
  return Promise.all([promise1, promise2]);
}

function getMetaData(id: string, filePath: string) {
  return readFile(filePath, {
    encoding: 'utf8',
  })
    .then((results) => {
      return getPage(id, results);
    })
    .catch((err) => {});
}

function getPage(id: string, data: string) {
  try {
    const jsonData = JSON.parse(data) as IPages;
    const searchId = parseInt(id);
    const ret = jsonData.items.find((x) => x.id === searchId);
    return { ...jsonData.metadata, item: ret };
  } catch (error) {
    Logger.debug(`getPage -> ${error}`);
  }
}

function getFilePath(fileName: string) {
  return path.resolve(__dirname, `../../data/${fileName}`);
}
