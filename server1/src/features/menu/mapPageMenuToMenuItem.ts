import type { MenuItem } from '@site8/shared';
import type { PageMenu } from '@site8/shared';
import type { Parent } from '@site8/shared';

/**
 * Transforms a PageMenu object into a MenuItem for navigation rendering
 * @param item - PageMenu object containing page data
 * @param currParent - Parent object representing the parent menu item
 * @param url - Optional URL override; uses item.url if not provided
 * @returns MenuItem object ready for menu rendering
 */
export const mapPageMenuToMenuItem = (
  item: PageMenu,
  currParent: Parent,
  url?: string,
): MenuItem => {
  return {
    id: item.id,
    label: item.title,
    parentItem: currParent,
    title: item.title,
    type: item.type,
    url: url ?? item.url,
  };
};
