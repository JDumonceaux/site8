const textToListItem = (value: string) => {
  return value
    .split('\n')
    .map((x) => `<li>${x}</li>`)
    .join('\n');
};

export const insertHTML = (
  value: string,
  startPosition: number,
  endPosition: number,
  action: string,
) => {
  try {
    const textBefore = value.slice(0, Math.max(0, startPosition));
    const textAfter = value.slice(Math.max(0, endPosition));
    const textMiddle = value.slice(startPosition, endPosition);

    switch (action) {
      case 'abbr': {
        return `${textBefore}<${action} title="">\n${textMiddle}\n</${action}>${
          textAfter
        }`;
      }
      case 'code': {
        return `${textBefore}<pre><code>\n${textMiddle}\n</code></pre>${
          textAfter
        }`;
      }
      case 'h2':
      case 'mark':
      case 'q':
      case 's':
      case 'sub':
      case 'sup': {
        return `${textBefore}<${action}>${textMiddle}</${action}>${textAfter}`;
      }
      case 'link': {
        return `${textBefore}<a href="">${textMiddle} </a>${textAfter}`;
      }
      case 'ol':
      case 'ul': {
        return `${textBefore}<${action}>\n${textToListItem(
          textMiddle,
        )}\n</${action}>${textAfter}`;
      }
      default: {
        return textBefore + textMiddle + textAfter;
      }
    }
  } catch {
    return null;
  }
};
