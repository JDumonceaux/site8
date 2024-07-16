import { Parent } from '../../..//types/Parent.js';
import { MenuItem } from '../../../types/MenuItem.js';
import { PageMenu } from '../../../types/PageMenu.js';

export const mapPageMenuToMenuItem = (
  item: PageMenu,
  currParent: Parent,
): MenuItem => {
  return {
    id: item.id,
    name: item.name,
    parentItem: currParent,
    to: item.to,
    url: item.url,
    toComplete: item.toComplete,
    type: item.type,
    issue: undefined,
    line: 0,
  };
};
