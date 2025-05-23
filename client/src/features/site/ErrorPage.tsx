import { type FC, memo } from 'react';

import Meta from 'components/core/Meta/Meta';
import styled from 'styled-components';

/**
 * Error Page – shown when an unexpected error occurs.
 */
const ErrorPage: FC = () => (
  <>
    <Meta title="Error Page" />
    <Container aria-label="Error message" role="alert">
      <Title>Error Page</Title>
      <Message>Sorry, something went wrong. Please try again later.</Message>
    </Container>
  </>
);

ErrorPage.displayName = 'ErrorPage';

export default memo(ErrorPage);

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
