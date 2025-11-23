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
