import { memo, type JSX } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';

import styled from 'styled-components';

/**
 * Props for the Article container, extending standard HTML attributes.
 */
type ArticleProps = HTMLAttributes<HTMLElement> & {
  /** Content to render inside the Article */
  children: ReactNode;
};

/**
 * A semantic Article container with flexible layout.
 * Provides a responsive flex container for article content.
 */
const Article = ({ children, ...rest }: ArticleProps): JSX.Element => (
  <Container {...rest}>{children}</Container>
);

Article.displayName = 'Article';
export default memo(Article);

// Styled component defining the Article layout
const Container = styled.article`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  padding: 18px;
`;
