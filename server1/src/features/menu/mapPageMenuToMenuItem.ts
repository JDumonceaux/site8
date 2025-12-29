import type { MenuItem } from '@site8/shared';
import type { PageMenu } from '@site8/shared';
import type { Parent } from '@site8/shared';

export const mapPageMenuToMenuItem = (
  item: PageMenu,
  currParent: Parent,
): MenuItem => {
  return {
    id: item.id,
    parentItem: currParent,
    title: item.title,
    type: item.type,
    url: item.url,
  };
};
