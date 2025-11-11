type ListAction = 'ol' | 'ul';
type InlineTag = 'h2' | 'mark' | 'q' | 's' | 'sub' | 'sup';
type WrapperTag = 'abbr' | 'code' | 'link' | InlineTag;

type InsertOptions = {
  action: ListAction | WrapperTag;
  href?: string; // for link
  title?: string; // for abbr
};

/**
 * Safely escape HTML special characters in text.
 */
const escapeHtml = (text: string): string =>
  text.replaceAll(/["&'<>]/gu, (char) => {
    switch (char) {
      case '"': {
        return '&quot;';
      }
      case '&': {
        return '&amp;';
      }
      case "'": {
        return '&#39;';
      }
      case '<': {
        return '&lt;';
      }
      case '>': {
        return '&gt;';
      }
      default: {
        return char;
      }
    }
  });

/**
 * Convert newline-delimited text into <li> items.
 */
export const textToListItems = (text: string): string =>
  text
    .split(/\r?\n/u)
    .map((line) => `<li>${escapeHtml(line)}</li>`)
    .join('\n');

/**
 * Insert HTML wrappers around a selected range in a string.
 * Returns the new HTML string or throws if invalid positions.
 */
export const insertHTML = (
  value: string,
  start: number,
  end: number,
  options: InsertOptions,
): string => {
  const { length } = value;
  const from = Math.max(0, Math.min(start, length));
  const to = Math.max(from, Math.min(end, length));

  const before = value.slice(0, from);
  const middle = value.slice(from, to);
  const after = value.slice(to);

  const escapedMiddle = escapeHtml(middle);

  // Build opening and closing tags
  let openTag: string;
  let closeTag: string;

  switch (options.action) {
    case 'abbr': {
      openTag = `<abbr title="${escapeHtml(options.title ?? '')}">`;
      closeTag = `</abbr>`;
      break;
    }
    case 'code': {
      openTag = `<pre><code>`;
      closeTag = `</code></pre>`;
      break;
    }
    case 'link': {
      openTag = `<a href="${escapeHtml(options.href ?? '#')}">`;
      closeTag = `</a>`;
      break;
    }
    case 'ol':
    case 'ul': {
      openTag = `<${options.action}>\n`;
      closeTag = `\n</${options.action}>`;
      return `${before}${openTag}${textToListItems(middle)}${closeTag}${after}`;
    }
    default: {
      // Inline tags: h2, mark, q, s, sub, sup
      openTag = `<${options.action}>`;
      closeTag = `</${options.action}>`;
    }
  }

  return `${before}${openTag}${escapedMiddle}${closeTag}${after}`;
};
