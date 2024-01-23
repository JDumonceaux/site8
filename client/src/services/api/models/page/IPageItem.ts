export interface IPagesItem {
  id: number;
  short_title: string;
  long_title?: string;
  edit_date?: Date;
  resources?: boolean;
  parent?: string;
  fileName?: string;
}
