import { useCallback, useEffect } from 'react';

import Meta from 'components/core/Meta/Meta';
import Button from 'components/form/Button/Button';
import StyledLink from 'components/Link/StyledLink/StyledLink';
import useAuth from 'features/auth/useAuth';
import styled from 'styled-components';

import AuthContainer from './AuthContainer';

const SignOutpPage = (): React.JSX.Element => {
  const title = 'Sign-Out';

  const { authFetchAuthSession, authorized, authSignOut, error, isLoading } =
    useAuth();

  useEffect(() => {
    authFetchAuthSession();
  }, [authFetchAuthSession]);

  const handleSubmit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();

      try {
        await authSignOut();
      } catch {
        // Handle sign-up error
      }
    },
    [authSignOut],
  );

  return (
    <>
      <Meta title={title} />
      <AuthContainer
        error={error}
        leftImage={<img alt="" src="/images/face.png" />}
        title="Sign Out">
        {authorized ? (
          <StyledError>
            Oops! It looks like you are already signed out. Would you like to{' '}
            <StyledLink to="/signin">Sign In</StyledLink>?
          </StyledError>
        ) : (
          <StyledForm
            noValidate
            // aria-errormessage={error ? 'error' : undefined}
            // aria-invalid={error ? 'true' : 'false'}
            // noValidate
            onSubmit={handleSubmit}>
            <Button id="login" variant="secondary">
              {isLoading ? 'Processing' : 'Sign Out'}
            </Button>
          </StyledForm>
        )}
      </AuthContainer>
    </>
  );
};

export default SignOutpPage;

const StyledForm = styled.form`
  padding: 20px 0;
`;

const StyledError = styled.div`
  padding: 20px 0;
  border: 1px solid #ff0000;
`;
