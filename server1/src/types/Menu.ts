export type Menu = {
  items?: {
    readonly id: number;
    readonly seq: number;
    readonly sort: string;
    readonly name: string;
    readonly items?: { readonly to: string; readonly label: string }[];
  }[];
};
