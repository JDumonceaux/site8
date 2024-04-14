export type Menu = {
  readonly id: number;
  readonly name: string;
  readonly url: string;
  readonly parentId?: number;
  readonly childCount?: number;
};
