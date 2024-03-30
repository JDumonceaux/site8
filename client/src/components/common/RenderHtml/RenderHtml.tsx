'use client';
//import DOMPurify from 'dompurify';
import parse, { Element, domToReact } from 'html-react-parser';
import RenderCode from '../RenderCode';
import type { DOMNode, HTMLReactParserOptions } from 'html-react-parser';

type RenderHtmlProps = {
  readonly text: string | undefined;
};

// HTMLReactParser options
const options: HTMLReactParserOptions = {
  replace: (domNode: DOMNode) => {
    if (!domNode) {
      return;
    }
    if (
      domNode instanceof Element &&
      domNode.tagName &&
      domNode.tagName === 'pre'
    ) {
      return (
        <RenderCode>
          {domToReact(domNode.children as DOMNode[], options)}
        </RenderCode>
      );
    } else {
      return;
    }
  },
  // replace: ({ attribs, children }) => {
  //   if (!attribs) {
  //     return;
  //   }

  //   if (attribs.class === 'prettify') {
  //     return <RenderCode>{domToReact(children, options)}</RenderCode>;
  //   }
};

export const RenderHtml = ({ text }: RenderHtmlProps) => {
  const htmlFrom = (text: string | undefined) => {
    if (!text) {
      return null;
    }

    // Note: This is too aggressive for the purpose and will strip out all HTML tags
    // Clean the HTML string - return only HMTL
    // const cleanHtmlString = DOMPurify.sanitize(text, {
    //   USE_PROFILES: { html: true },
    // });

    // Parse the HTML string
    return parse(text, options);
  };

  return <>{htmlFrom(text)}</>;
};

export default RenderHtml;
