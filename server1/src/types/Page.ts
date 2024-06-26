import { ParentSortby } from './ParentSortby.js';

export type Page = {
  readonly id: number;
  readonly name: string;
  readonly to?: string;
  readonly url?: string;
  readonly text?: string;
  readonly edit_date?: Date;
  readonly create_date?: Date;
  readonly content: boolean;
  readonly reading_time?: string;
  readonly readability_score?: string;
  readonly type: 'root' | 'menu' | 'page';
  readonly items?: Page[];
  readonly parentItems?: ParentSortby[];
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
  if (ob1.name === undefined || ob2.name === undefined) {
    return 0;
  }
  return ob1.id - ob2.id;
}
