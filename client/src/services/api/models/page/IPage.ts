export interface IPage {
  metadata: {
    id: number;
    data_type: string;
    title: string;
  };
  text: string[];
}
