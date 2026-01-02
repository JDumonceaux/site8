import type { PageMenu } from '@site8/shared';
import type { PageText } from '../../types/PageText.js';

/**
 * Maps a PageMenu object to a PageText object with empty text content
 * @param item - PageMenu object to convert
 * @returns PageText object with all PageMenu properties plus empty text field, or undefined if input is undefined
 */
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
