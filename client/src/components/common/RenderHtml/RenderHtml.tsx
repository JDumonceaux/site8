'use client';
import DOMPurify from 'dompurify';
import parse, { domToReact } from 'html-react-parser';
import { PageTitle } from '../PageTitle';
import RenderCode from '../RenderCode';

type RenderHtmlProps = {
  readonly text: string | undefined;
};

const options = {
  replace: ({ attribs, children }) => {
    if (!attribs) {
      return;
    }

    if (attribs.id === 'main') {
      return <PageTitle title={domToReact(children, options)} />;
    }

    if (attribs.class === 'prettify') {
      return <RenderCode>{domToReact(children, options)}</RenderCode>;
    }
  },
};

export const RenderHtml = ({ text }: RenderHtmlProps) => {
  const htmlFrom = (text: string | undefined) => {
    if (!text) {
      return null;
    }
    const cleanHtmlString = DOMPurify.sanitize(text, {
      USE_PROFILES: { html: true },
    });
    const html = parse(cleanHtmlString, options);
    return html;
  };

  return <>{htmlFrom(text)}</>;
};

export default RenderHtml;
