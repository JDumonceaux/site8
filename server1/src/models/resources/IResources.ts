import { IResource } from './IResource.js';

export interface IResources {
  metadata: {
    id: number;
    data_type: string;
  };
  items: IResource[];
}
