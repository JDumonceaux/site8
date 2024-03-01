import { Bookmark } from './Bookmark';

export type BookmarksTag = {
  readonly tag: string;
  readonly items: Bookmark[];
};
