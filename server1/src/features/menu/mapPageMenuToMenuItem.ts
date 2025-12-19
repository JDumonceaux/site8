import type { MenuItem } from '../../types/MenuItem.js';
import type { PageMenu } from '../../types/PageMenu.js';
import type { Parent } from '../../types/Parent.js';

export const mapPageMenuToMenuItem = (
  item: PageMenu,
  currParent: Parent,
): MenuItem => {
  return {
    id: item.id,
    issue: undefined,
    line: 0,
    parentItem: currParent,
    title: item.title,
    to: item.to,
    toComplete: item.toComplete,
    type: item.type,
    url: item.url,
  };
};
