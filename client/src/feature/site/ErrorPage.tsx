import type { JSX } from 'react';

import Meta from '../../components/meta/Meta';
import styled from 'styled-components';

/**
 * Error Page – shown when an unexpected error occurs.
 */
const ErrorPage = (): JSX.Element => (
  <>
    <Meta title="Error Page" />
    <Container
      aria-label="Error message"
      role="alert"
    >
      <Title>Error Page</Title>
      <Message>Sorry, something went wrong. Please try again later.</Message>
    </Container>
  </>
);

export default ErrorPage;
ErrorPage.displayName = 'ErrorPage';

const Container = styled.div`
  margin-top: 20%;
  text-align: center;
`;

const Message = styled.p`
  color: var(--palette-dark, #000);
  font-size: 1rem;
`;

const Title = styled.h1`
  color: red;
`;
