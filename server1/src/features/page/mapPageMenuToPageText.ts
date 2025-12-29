import type { PageMenu } from '@site8/shared';
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
