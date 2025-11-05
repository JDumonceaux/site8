import type { MenuItem } from '../../types/MenuItem.js';
import type { PageMenu } from '../../types/PageMenu.js';
import type { Parent } from '../../types/Parent.js';

export const mapPageMenuToMenuItem = (
  item: PageMenu,
  currParent: Parent,
): MenuItem => {
  return {
    id: item.id,
    title: item.title,
    parentItem: currParent,
    to: item.to,
    url: item.url,
    toComplete: item.toComplete,
    type: item.type,
    issue: undefined,
    line: 0,
  };
};
