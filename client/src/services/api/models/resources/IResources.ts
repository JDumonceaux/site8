import { IResource } from './IResource';

export interface IResources {
  metadata: {
    id: number;
    data_type: string;
    title: string;
  };
  items: IResource[];
}
