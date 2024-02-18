import express, { Request, Response } from 'express';

import { PagesService } from 'services/PagesService.js';
import { PageService } from 'services/PageService.js';

export const pageRouter = express.Router();

// Get item
pageRouter.get('/:id', (req: Request, res: Response) => {
  const id = req.params.id;
  const tempId = parseInt(id);
  if (isNaN(tempId) || tempId === 0) {
    return null;
  }
  // eslint-disable-next-line promise/catch-or-return, promise/always-return
  getAllData(tempId).then(([r0, r1]) => {
    res.json({ ...r0, text: r1 });
  });
});

// Update Item
pageRouter.patch('/', (req: Request, res: Response) => {
  const service = new PagesService();
  const service2 = new PageService();
  const data = req.body;
  const promise1 = service.updateItem(data);
  const promise2 = service2.updateItem(data);
  Promise.all([promise1, promise2]).then(() => {
    res.json({ results: 'Success' });
  });
});

// Delete Item
pageRouter.delete('/:id', (req: Request, res: Response) => {
  const id = req.params.id;
  const tempId = parseInt(id);
  if (isNaN(tempId) || tempId === 0) {
    return null;
  }
  const service = new PagesService();
  const service2 = new PageService();
  // eslint-disable-next-line promise/catch-or-return, promise/always-return
  const promise1 = service.deleteItem(tempId);
  const promise2 = service2.deleteItem(tempId);
  Promise.all([promise1, promise2]).then(() => {
    res.json({ results: 'Success' });
  });
});

// Add new item
pageRouter.post('/', async (req: Request, res: Response) => {
  const service = new PagesService();
  const service2 = new PageService();
  const data = req.body;
  // // eslint-disable-next-line promise/catch-or-return, promise/always-return
  const nextId = await service.getLastId().then((data) => {
    return data || 1;
  });

  const promise1 = service.addItem(nextId, data);
  const promise2 = service2.addItem(nextId, data);
  Promise.all([promise1, promise2]).then(() => {
    res.json({ results: 'Success' });
  });
});

function getAllData(id: number) {
  const service = new PagesService();
  const service2 = new PageService();
  const promise1 = service.getMetaData(id);
  const promise2 = service2.getItem(id);
  return Promise.all([promise1, promise2]);
}
