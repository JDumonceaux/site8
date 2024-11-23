import express, { Request, Response } from 'express';
import { Errors } from '../lib/utils/constants.js';
import { Logger } from '../lib/utils/logger.js';
import { ImagesFileService } from '../feature/images/ImagesFileService.js';
import { ImagesService } from '../feature/images/ImagesService.js';
import { ImagesEdit } from '../types/ImagesEdit.js';

export const imagesRouter = express.Router();

imagesRouter.get('/', async (_req: Request, res: Response) => {
  try {
    // Get all records from images.json
    const images = await new ImagesService().getItems();
    if (images) {
      res.status(200).json(images);
    } else {
      res.status(204).json({ error: Errors.NO_CONTENT });
    }
  } catch (error) {
    Logger.error(`imagesRouter: get -> Error: ${error}`);
    res.status(500).json({ error: Errors.SERVER_ERROR });
  }
});

imagesRouter.get('/edit', async (_req: Request, res: Response) => {
  try {
    const images = await new ImagesService().getEditItems();
    if (images) {
      res.status(200).json(images);
    } else {
      res.status(204).json({ error: Errors.NO_CONTENT });
    }
  } catch (error) {
    Logger.error(`imagesRouter: get -> edit. Error: ${error}`);
    res.status(500).json({ error: Errors.SERVER_ERROR });
  }
});

// Get all images from the 'sort' folder that need to be categorized
imagesRouter.get('/new', async (_req: Request, res: Response) => {
  try {
    const images = await new ImagesService().getNewItems();
    if (images) {
      res.status(200).json(images);
    } else {
      res.status(204).json({ error: Errors.NO_CONTENT });
    }
  } catch (error) {
    Logger.error(`imagesRouter: get -> new. Error: ${error}`);
    res.status(500).json({ error: Errors.SERVER_ERROR });
  }
});

imagesRouter.get('/scan', async (_req: Request, res: Response) => {
  try {
    const images = await new ImagesService().scanForNewItems();
    if (images) {
      res.status(200).json(images);
    } else {
      res.status(204).json({ error: Errors.NO_CONTENT });
    }
  } catch (error) {
    Logger.error(`imagesRouter: get -> new. Error: ${error}`);
    res.status(500).json({ error: Errors.SERVER_ERROR });
  }
});

imagesRouter.get('/folders', async (_req: Request, res: Response) => {
  try {
    const folders = await new ImagesFileService().getFolders();
    if (folders) {
      res.status(200).json(folders);
    } else {
      res.status(204).json({ error: Errors.NO_CONTENT });
    }
  } catch (error) {
    Logger.error(`imagesRouter: scan -> Error: ${error}`);
    res.status(500).json({ error: Errors.SERVER_ERROR });
  }
});

// imagesRouter.get('/scan', async (_req: Request, res: Response) => {
//   try {
//     const images = await new ImagesFileService().getNewItems();
//     images
//       ? res.status(200).json(images)
//       : res.status(204).json({ error: Errors.NO_CONTENT });
//   } catch (error) {
//     Logger.error(`imagesRouter: scan -> Error: ${error}`);
//     res.status(500).json({ error: Errors.SERVER_ERROR });
//   }
// });

// Scan the 'sort' directory for new items and load into images.json
// imagesRouter.get('/new', async (_req: Request, res: Response) => {
//   try {
//     const images = await new ImagesService().loadNewItems();
//     images
//       ? res.status(200).json(images)
//       : res.status(204).json({ error: Errors.NO_CONTENT });
//   } catch (error) {
//     Logger.error(`imagesRouter: new -> Error: ${error}`);
//     res.status(500).json({ error: Errors.SERVER_ERROR });
//   }
// });

imagesRouter.get('/fix-file-names', async (_req: Request, res: Response) => {
  try {
    const ret = await new ImagesFileService().fixNames();
    if (ret) {
      res.status(200).send('Done');
    } else {
      res.status(500).json({ error: Errors.SERVER_ERROR });
    }
    //const ret = "Not implemented";
    //res.status(501).json(ret);
  } catch (error) {
    Logger.error(`imagesRouter: fixFileNames -> Error: ${error}`);
    res.status(500).json({ error: Errors.SERVER_ERROR });
  }
});

imagesRouter.get('/reindex', async (_req: Request, res: Response) => {
  try {
    const ret = await new ImagesService().fixIndex();
    if (ret) {
      res.status(200).send('Done');
    } else {
      res.status(500).json({ error: Errors.SERVER_ERROR });
    }
  } catch (error) {
    Logger.error(`imagesRouter: fixIndex -> Error: ${error}`);
    res.status(500).json({ error: Errors.SERVER_ERROR });
  }
});

imagesRouter.get('/list-duplicates', async (_req: Request, res: Response) => {
  try {
    const ret = await new ImagesService().listDuplicates();
    if (ret) {
      res.status(200).send('Done');
    } else {
      res.status(500).json({ error: Errors.SERVER_ERROR });
    }
    //const ret = "Not implemented";
    //res.status(501).json(ret);
  } catch (error) {
    Logger.error(`imagesRouter: listDuplicates -> Error: ${error}`);
    res.status(500).json({ error: Errors.SERVER_ERROR });
  }
});

// imagesRouter.get('/sync', async (_req: Request, res: Response) => {
//   try {
//     const images = await new ImagesService().syncItems();
//     images
//       ? res.status(200).json(images)
//       : res.status(204).json({ error: Errors.NO_CONTENT });
//   } catch (error) {
//     Logger.error(`imagesRouter: get -> Error: ${error}`);
//     res.status(500).json({ error: Errors.SERVER_ERROR });
//   }
// });

imagesRouter.patch('/', async (req: Request, res: Response) => {
  try {
    const data: ImagesEdit = req.body;
    const ret = await new ImagesService().updateItems(data.items);
    if (ret) {
      res.status(200).send('Updated');
    } else {
      res.status(500).json({ error: Errors.SERVER_ERROR });
    }
  } catch (error) {
    Logger.error(`imagesRouter: patch -> Error: ${error}`);
    res.status(500).json({ error: Errors.SERVER_ERROR });
  }
});
