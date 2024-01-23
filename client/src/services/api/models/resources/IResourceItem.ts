export interface IResourceItem {
  id: number;
  name?: string;
  description?: string;
  url: string;
  tags?: string[];
  rank?: number;
  set?: number[];
}
