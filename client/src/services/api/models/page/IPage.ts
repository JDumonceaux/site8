export interface IPage {
  metadata: {
    id: number;
    data_type: string;
    title: string;
  };
  item: {
    id: number;
    short_title: string;
    long_title?: string;
    edit_date?: Date;
    resources?: boolean;
    parent?: string;
    fileName?: string;
  };
  text: string;
}
