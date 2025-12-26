export type MenuAdd = {
  readonly action?: string;
  readonly complete?: string;
  readonly description?: string;
  readonly id?: number;
  readonly issue?: string;
  readonly lineId?: number;
  readonly name?: string;
  readonly parentId?: number;
  readonly parentItems?: readonly {
    readonly id: number;
    readonly name?: string;
    readonly seq?: number;
    readonly sortby?: string;
  }[];
  readonly parentSeq?: number;
  readonly parentSortby?: string;
  readonly priority?: number;
  readonly seq?: number;
  readonly sortby?: string;
  readonly status?: string;
  readonly tags?: string;
  readonly title?: string;
  readonly to?: string;
  readonly toComplete?: string;
  readonly type?: string;
  readonly value?: string;
};
