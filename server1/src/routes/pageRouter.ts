import express, { Request, Response } from 'express';

import { readFile, writeFile } from 'fs/promises';
import { IPage } from '../models/resources/IPage.js';
import { IPages } from '../models/resources/IPages.js';
import { getFilePath } from '../utils/getFilePath.js';
import { Logger } from '../utils/Logger.js';


export const pageRouter = express.Router();

pageRouter.get('/:id', (req: Request, res: Response) => {
  getAllData(req.params.id).then(([r0, r1]) => {
    res.json({ ...r0, text: r1 });
  });
});

pageRouter.patch('/is', (req: Request, res: Response) => {
  const data = req.body;
  
  updateData(req.params.id, data, getFilePath('pages.json')).then(() => {
    res.json({ ...data });
  });
});

pageRouter.post('/', (req: Request, res: Response) => {
  const data = req.body;
  appendData(data, getFilePath('pages.json')).then(() => {
    res.json({ ...data });
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
    .catch((_err) => {});
}

function getPage(id: string, data: string) {
  try {
    const jsonData = JSON.parse(data) as IPages;
    const searchId = parseInt(id);
    const item = jsonData.items.find((x) => x.id === searchId);
    return { ...jsonData.metadata, item: item};
  } catch (error) {
    Logger.debug(`getPage -> ${error}`);
  }
  return undefined;
}

function appendData(data: IPage, filePath: string) {
  const lastId = getLastId(filePath);
 const nextId = lastId ? lastId + 1 : + 1;
 
  return readFile(filePath, {
    encoding: 'utf8',
  })
    .then((results) => {
      const jsonData = JSON.parse(results) as IPages;
      const ret = { ...jsonData, items: [...jsonData.items, { ...data, id: nextId }] };
      
      writeFile(filePath, JSON.stringify(ret, null, 2), {
        encoding: 'utf8',
      });
    })
    .catch((_err) => {});
}

function updateData(id: string, data: IPage, filePath: string) {
  return readFile(filePath, {
    encoding: 'utf8',
  })
    .then((results) => {
      const jsonData = JSON.parse(results) as IPages;
      const searchId = parseInt(id);
  
      const filteredItems = jsonData.items.filter((x) => x.id !== searchId);    
      const ret = { ...jsonData, items: [...filteredItems, data] };
      
      writeFile(filePath, JSON.stringify(ret, null, 2), {
        encoding: 'utf8',
      });
    })
    .catch((_err) => {});
}

function getLastId(filePath: string): number | undefined {
   readFile(filePath, {
    encoding: 'utf8',
  })
    .then((results) => {
      const jsonData = JSON.parse(results) as IPages;
     
      const maxItem = jsonData.items.reduce(function(a, b) {
        if (+a.id > +b.id) {
            return a;
        } else {
            return b;
        }
        });
      return maxItem ? maxItem.id : undefined;   
    })
    .catch((_err) => {});
return undefined;
}