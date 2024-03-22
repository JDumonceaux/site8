import { useCallback, useEffect } from 'react';
import { Meta } from 'components';
import { Button2 } from 'components/ui/Form';

import { APP_NAME } from 'utils';

import useAuth from 'services/hooks/useAuth';

import { styled } from 'styled-components';
import { AuthContainer } from './AuthContainer';

export const SignOutpPage = (): JSX.Element => {
  const title = 'Sign-Out';

  const { authSignOut, isLoading, error } = useAuth();

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

  useEffect(() => {
    document.title = `${APP_NAME} - ${title}`;
  }, []);

  return (
    <>
      <Meta title={title} />
      <AuthContainer
        error={error}
        leftImage={<img alt="" src="/images/face.png" />}
        title="Sign Out">
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
      </AuthContainer>
    </>
  );
};

export default SignOutpPage;

const StyledForm = styled.form`
  padding: 20px 0;
`;
