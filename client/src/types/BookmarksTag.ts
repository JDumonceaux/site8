import { Bookmark } from './Bookmark';

export type BookmarksTag = {
  readonly items: Bookmark[];
  readonly tag: string;
};
