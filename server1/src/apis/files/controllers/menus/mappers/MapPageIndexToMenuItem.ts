import { MenuItem } from 'types/MenuItem.js';
import { PageIndex } from 'types/PageIndex.js';
import { Parent } from 'types/Parent.js';

export const mapPageIndexToMenuItem = (
  item: PageIndex,
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
