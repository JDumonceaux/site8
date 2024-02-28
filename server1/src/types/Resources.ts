import { Resource } from './Resource.js';

export interface Resources {
  metadata: {
    id: number;
    data_type: string;
  };
  items: Resource[];
}
