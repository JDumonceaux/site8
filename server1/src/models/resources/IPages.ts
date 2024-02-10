import { IPage } from './IPage';

export interface IPages {
  metadata: {
    id: number;
    data_type: string;
  };
  items: IPage[];
}
