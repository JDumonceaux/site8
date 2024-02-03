import { IResource } from './IResource';

export interface IResources {
  metadata: {
    id: number;
    data_type: string;
  };
  items: IResource[];
}
