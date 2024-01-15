import { IArtItem } from "./IArtItem";

export interface IArt {
  metadata: {
    id: number;
    data_type: string;
    title: string;
  };
  items: IArtItem[];
}
