import { MenuItem } from './MenuItem.js';
import { Page } from './Page.js';

// Returned to front end
export type MenuEntry = {
  // readonly id: number;
  // readonly name: string;
  // readonly parentId: number;
  // readonly seq: number;
  // readonly type: 'menu' | 'page';
  // readonly sortby: 'seq' | 'name';
  // readonly item?: Page | MenuItem;
  // readonly to?: string;
  // readonly toComplete?: string;
  // readonly url?: string;
  // readonly menuItems?: MenuEntry[];
  // readonly pageItems?: MenuEntry[];
  // readonly items?: MenuEntry[];
  // readonly parent?: { id?: number; seq?: number }[];
};

//  Sort the MenuEntry by seq, then name
// export function sortMenuEntrySeq(ob1: MenuEntry, ob2: MenuEntry) {
//   if (ob1.seq !== ob2.seq) {
//     return ob1.seq - ob2.seq;
//   }
//   return ob1.name.localeCompare(ob2.name);
// }

// //  Sort the MenuEntry by seq, then name
// export function sortMenuEntryName(ob1: MenuEntry, ob2: MenuEntry) {
//   const nameComparison = ob1.name.localeCompare(ob2.name);
//   if (nameComparison !== 0) {
//     return nameComparison;
//   }
//   return ob1.seq - ob2.seq;
// }
