import { type FormEvent, type JSX, useEffect } from 'react';

import Button from '@components/core/button/Button';
import Meta from '@components/core/meta/Meta';
import StyledLink from '@components/link/styled-link/StyledLink';
import useAuth from '@features/auth/useAuth';
import AuthContainer from './AuthContainer';
import styled from 'styled-components';

const SignOutpPage = (): JSX.Element => {
  const title = 'Sign-Out';

  const { authFetchAuthSession, authorized, authSignOut, error, isLoading } =
    useAuth();

  useEffect(() => {
    void authFetchAuthSession();
  }, [authFetchAuthSession]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    void (async () => {
      try {
        await authSignOut();
      } catch {
        // Handle sign-up error
      }
    })();
  };

  return (
    <>
      <Meta title={title} />
      <AuthContainer
        leftImage={
          <img
            alt=""
            src="/images/face.png"
          />
        }
        title="Sign Out"
        error={error}
      >
        {authorized ? (
          <StyledError>
            Oops! It looks like you are already signed out. Would you like to
            <StyledLink to="/signin">Sign In</StyledLink>?
          </StyledError>
        ) : (
          <StyledForm
            noValidate
            // aria-errormessage={error ? 'error' : undefined}
            // aria-invalid={error ? 'true' : 'false'}
            // noValidate
            onSubmit={handleSubmit}
          >
            <Button
              id="login"
              variant="secondary"
            >
              {isLoading ? 'Processing' : 'Sign Out'}
            </Button>
          </StyledForm>
        )}
      </AuthContainer>
    </>
  );
};

SignOutpPage.displayName = 'SignOutPage';
export default SignOutpPage;

const StyledForm = styled.form`
  padding: 20px 0;
`;

const StyledError = styled.div`
  padding: 20px 0;
  border: 1px solid #ff0000;
`;
