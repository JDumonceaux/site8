import { PageMenu } from '../../types/Page.js';
import { PageText } from '../../types/PageText.js';

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
