import { ITestGridItem } from "./ITestGridItem";

export interface ITestGrid {
  metadata: {
    id: number;
    data_type: string;
    title: string;
  };
  items: ITestGridItem[];
}
