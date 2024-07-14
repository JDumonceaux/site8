import { Request, Response } from 'express';

const PageController = {
  helloWorld: (_req: Request, res: Response) => {
    return res.status(400).json({
      message: 'Hello, World!',
    });
  },

  getById: (_req: Request, res: Response) => {
    return res.status(400).json({
      message: 'Hello, World!',
    });
  },
};

export default PageController;
