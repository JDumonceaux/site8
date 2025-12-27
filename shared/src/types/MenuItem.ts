/**
 * MenuItem type - represents a menu item in navigation
 */
export type MenuItem = {
  readonly icon?: string;
  readonly id: number;
  readonly label: string;
  readonly order?: number;
  readonly parent?: number;
  readonly path?: string;
};
