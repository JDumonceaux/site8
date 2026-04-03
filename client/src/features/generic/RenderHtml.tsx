import { sanitizeUrl } from '@lib/utils/helpers-security';
import parse, {
  type DOMNode,
  domToReact,
  Element,
  type HTMLReactParserOptions,
} from 'html-react-parser';
import RenderCode from './RenderCode';

type RenderHtmlProps = {
  readonly text?: string;
};

// Tags that can execute code or load external resources — removed entirely.
const BLOCKED_TAGS = new Set(['embed', 'iframe', 'object', 'script', 'style']);

const options: HTMLReactParserOptions = {
  replace: (domNode: DOMNode) => {
    if (!(domNode instanceof Element)) return null;

    if (BLOCKED_TAGS.has(domNode.tagName)) return false;

    if (domNode.tagName === 'pre') {
      return (
        <RenderCode>
          {domToReact(domNode.children as DOMNode[], options)}
        </RenderCode>
      );
    }

    // Sanitize href on anchor elements to block javascript: navigation.
    if (domNode.tagName === 'a' && domNode.attribs.href != null) {
      return (
        <a href={sanitizeUrl(domNode.attribs.href)}>
          {domToReact(domNode.children as DOMNode[], options)}
        </a>
      );
    }

    return null;
  },
};

const parseHtml = (htmlText?: string) => {
  if (!htmlText) {
    return null;
  }
  return parse(htmlText, options);
};

const RenderHtml = ({ text }: RenderHtmlProps) => {
  return <>{parseHtml(text)}</>;
};

export default RenderHtml;
