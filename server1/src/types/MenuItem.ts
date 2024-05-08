// Structure of MenuItem in pagesIndex.json

export type MenuItem = {
  readonly id: number;
  readonly name: string;
  readonly url: string;
  readonly to: string;
  readonly parent: { id?: number; seq?: number }[];
  readonly sortby: 'seq' | 'name';
};
