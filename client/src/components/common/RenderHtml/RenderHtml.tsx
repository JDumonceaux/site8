//import DOMPurify from 'dompurify';
import parse, { Element, domToReact } from 'html-react-parser';

import type { DOMNode, HTMLReactParserOptions } from 'html-react-parser';
import RenderCode from '../RenderCode/RenderCode';

type RenderHtmlProps = {
  readonly text?: string;
};

// HTMLReactParser options
const options: HTMLReactParserOptions = {
  replace: (domNode: DOMNode) => {
    if (domNode instanceof Element && domNode.tagName === 'pre') {
      return (
        <RenderCode>
          {domToReact(domNode.children as DOMNode[], options)}
        </RenderCode>
      );
    }
    return undefined;
  },
};

const RenderHtml = ({ text }: RenderHtmlProps) => {
  const parseHtml = (htmlText?: string) => {
    if (!htmlText) {
      return null;
    }
    return parse(htmlText, options);
  };

  return <>{parseHtml(text)}</>;
};

export default RenderHtml;
