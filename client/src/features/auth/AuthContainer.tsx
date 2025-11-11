import type { JSX, ReactNode } from 'react';

import Layout from '@features/layouts/Layout/Layout';
import styled from 'styled-components';

export type AuthContainerProps = {
  /** Form or other content to render on the right */
  children: ReactNode;
  /** Optional error object with code and message */
  error?: null | { code: string; message: string };
  /** Illustration or graphic to render on the left */
  leftImage: ReactNode;
  /** Page title displayed above the form */
  title: string;
};

/**
 * Layout wrapper for authentication pages with a left graphic and right form.
 */
export const AuthContainer = ({
  children,
  error,
  leftImage,
  title,
}: AuthContainerProps): JSX.Element | null => (
  <Layout.Main>
    <Grid>
      <Left aria-hidden="true">{leftImage}</Left>
      <Right>
        <Title>{title}</Title>
        {error ? (
          <ErrorMessage
            id="error"
            role="alert"
          >
            <p>Oops! There was an error:</p>
            <p>{error.message}</p>
          </ErrorMessage>
        ) : null}
        {children}
      </Right>
    </Grid>
  </Layout.Main>
);

AuthContainer.displayName = 'AuthContainer';
export default AuthContainer;

const ErrorMessage = styled.div`
  border: 1px solid var(--palette-error);
  color: var(--palette-error);
  padding: 12px 16px;
  font-size: 0.9rem;
  margin-bottom: 20px;

  p {
    margin: 4px 0;
  }
`;

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  max-width: 940px;
  margin: 60px auto 0;
  container: parent;
  container-type: inline-size;
`;

const Left = styled.div`
  margin-left: auto;
  width: 100%;
  max-width: 100px;
  padding: 0 20px 20px;

  @container parent (inline-size > 430px) {
    width: 50%;
    padding: 0 40px;
  }

  > img {
    box-shadow:
      -3px -3px 10px #c7c7c7,
      6px 6px 10px #bebebe;
  }
`;

const Right = styled.div`
  width: 100%;
  max-width: 430px;
  padding: 0 20px;
  margin: 0 auto;

  @container parent (inline-size > 430px) {
    width: 50%;
    min-width: 360px;
    padding: 0 16px;
  }
`;

const Title = styled.h1`
  font-size: 1.2rem;
  font-weight: 700;
`;
