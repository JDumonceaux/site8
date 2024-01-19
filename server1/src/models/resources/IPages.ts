import { IPagesItem } from './IPagesItem';

export interface IPages {
  metadata: {
    id: number;
    data_type: string;
    title: string;
  };
  items: IPagesItem[];
}
