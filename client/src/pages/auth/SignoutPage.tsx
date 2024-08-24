import Button from 'components/form/Button/Button';
import StyledLink from 'components/ui/Link/StyledLink/StyledLink';
import Meta from 'components/ui/Meta/Meta';
import useAuth from 'hooks/useAuth';
import { useCallback, useEffect } from 'react';
import { styled } from 'styled-components';
import AuthContainer from './AuthContainer';

const SignOutpPage = (): JSX.Element => {
  const title = 'Sign-Out';

  const { authFetchAuthSession, authSignOut, isLoading, error, authorized } =
    useAuth();

  useEffect(() => {
    authFetchAuthSession();
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
            <Button id="login" variant="secondary">
              {isLoading ? 'Processing' : 'Sign Out'}
            </Button>
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
