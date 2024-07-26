import console from 'console';

const textToListItem = (value: string) => {
  return value
    .split('\n')
    .map((x) => '<li>' + x + '</li>')
    .join('\n');
};

export const insertHTML = (
  value: string,
  startPosition: number,
  endPosition: number,
  action: string,
) => {
  try {
    const textBefore = value.substring(0, startPosition);
    const textAfter = value.substring(endPosition);
    const textMiddle = value.substring(startPosition, endPosition);

    switch (action) {
      case 'ol':
      case 'ul':
        return (
          textBefore +
          `<${action}>\n` +
          textToListItem(textMiddle) +
          `\n</${action}>` +
          textAfter
        );
      case 'link':
        return textBefore + `<a href="">\n` + textMiddle + `\n</a>` + textAfter;
      case 'code':
        return (
          textBefore +
          `<pre><code>\n` +
          textMiddle +
          `\n</code></pre>` +
          textAfter
        );
      case 'abbr':
        return (
          textBefore +
          `<${action} title="">\n` +
          textMiddle +
          `\n</${action}>` +
          textAfter
        );
      case 'h2':
      case 'q':
      case 's':
      case 'mark':
      case 'sup':
      case 'sub':
        return (
          textBefore + `<${action}>` + textMiddle + `</${action}>` + textAfter
        );
      default:
        return textBefore + textMiddle + textAfter;
    }
  } catch (error) {
    console.error('Error parsing date:', error);
    return undefined;
  }
};
