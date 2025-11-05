import type { PageMenu } from '../../types/PageMenu.js';
import type { PageText } from '../../types/PageText.js';

export const mapPageMenuToPageText = (
  item: PageMenu | undefined,
): PageText | undefined => {
  if (!item) {
    return undefined;
  }
  return {
    ...item,
    text: '',
  };
};
