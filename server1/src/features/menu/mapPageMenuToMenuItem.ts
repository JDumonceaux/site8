import { Parent } from '../../types/Parent.js';
import { MenuItem } from '../../types/MenuItem.js';
import { Page } from '../../types/Page.js';

export const mapPageMenuToMenuItem = (
  item: Page,
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
