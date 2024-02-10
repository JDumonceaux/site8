import { IPage } from './IPage.js';

export interface IPages {
  metadata: {
    id: number;
    data_type: string;
  };
  items: IPage[];
}
