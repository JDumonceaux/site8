import type { JSX } from 'react';
import styled from 'styled-components';

/**
 * Props for the Article container, extending standard HTML attributes.
 */
type ArticleProps = React.HTMLAttributes<HTMLElement> & {
  /** Content to render inside the Article */
  children: React.ReactNode;
};

/**
 * A semantic Article container with flexible layout.
 */
export const Article = ({ children, ...rest }: ArticleProps): JSX.Element => (
  <Container data-testid="article" {...rest}>
    {children}
  </Container>
);
Article.displayName = 'Article';

// Styled component defining the Article layout
const Container = styled.article`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  padding: 18px;
`;
