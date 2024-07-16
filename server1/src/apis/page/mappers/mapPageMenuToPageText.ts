import { PageMenu } from '../../../types/PageMenu.js';
import { PageText } from '../../../types/PageText.js';

export const mapPageMenuToPageText = (
  item: PageMenu | undefined,
): PageText | undefined => {
  if (!item) {
    return undefined;
  }
  return {
    id: item.id,
    name: item.name,
    to: item.to,
    url: item.url,
    toComplete: item.toComplete,
    type: 'page',
    issue: undefined,
    line: 0,
  };
};
