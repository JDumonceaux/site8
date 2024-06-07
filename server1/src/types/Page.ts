export type Page = {
  readonly id: number;
  readonly tempId?: number;
  readonly name: string;
  readonly to?: string;
  readonly url?: string;
  readonly text?: string;
  readonly edit_date?: Date;
  readonly create_date?: Date;
  readonly file?: boolean;
  readonly reading_time?: string;
  readonly readability_score?: string;
  readonly type: 'root' | 'menu' | 'page';
  readonly items?: Page[];
  readonly toComplete?: string;
  readonly parentId?: number;
  readonly seq?: number;
  readonly parent?: { readonly id: number; readonly seq: number }[];
  readonly sortby: 'seq' | 'name';
};

//  Sort the Page by seq, then name
export function sortMenuEntrySeq(ob1: Page, ob2: Page) {
  // if (ob1.seq !== ob2.seq) {
  //   return ob1.seq - ob2.seq;
  // }
  return ob1.name.localeCompare(ob2.name);
}

//  Sort the Page by seq, then name
export function sortMenuEntryName(ob1: Page, ob2: Page) {
  const nameComparison = ob1.name.localeCompare(ob2.name);
  if (nameComparison !== 0) {
    return nameComparison;
  }
  if (ob1.seq === undefined || ob2.seq === undefined) {
    return 0;
  }
  return ob1.seq - ob2.seq;
}
