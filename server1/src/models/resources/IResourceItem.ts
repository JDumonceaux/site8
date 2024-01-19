export interface IResourceItem {
  id: number;
  url: string;
  name?: string;
  description?: string;
  tags?: string[];
  rank?: number;
  set?: number[];
}
