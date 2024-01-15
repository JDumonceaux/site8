import { IResourceItem } from "./IResourceItem";

export interface IResources {
  metadata: {
    id: number;
    data_type: string;
    title: string;
  };
  items: IResourceItem[];
}
