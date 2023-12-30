import { IMusicItem } from "./IMusicItem";

export interface IMusic {
  metadata: {
    id: number;
    data_type: string;
    title: string;
  };
  items: IMusicItem[];
}
