import { useCallback, useEffect } from 'react';
import { Meta } from 'components';
import { Button2 } from 'components/ui/Form';
import useAuth from 'services/hooks/useAuth';

import { styled } from 'styled-components';
import { AuthContainer } from './AuthContainer';
import { StyledLink } from 'components/ui/Form/StyledLink';

export const SignOutpPage = (): JSX.Element => {
  const title = 'Sign-Out';

  const { authFetchAuthSession, authSignOut, isLoading, error, authorized } =
    useAuth();

  useEffect(() => {
    authFetchAuthSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();

      try {
        await authSignOut();
      } catch (error) {
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
        {!authorized ? (
          <StyledForm
            noValidate
            // aria-errormessage={error ? 'error' : undefined}
            // aria-invalid={error ? 'true' : 'false'}
            // noValidate
            onSubmit={handleSubmit}>
            <Button2 id="login" type="submit" variant="secondary">
              {isLoading ? 'Processing' : 'Sign Out'}
            </Button2>
          </StyledForm>
        ) : (
          <StyledError>
            Oops! It looks like you are already signed out. Would you like to{' '}
            <StyledLink to="/signin">Sign In</StyledLink>?
          </StyledError>
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
