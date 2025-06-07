import type { JSX } from 'react';
import Meta from 'components/core/Meta/Meta';
import Input from 'components/Input/Input';
import StyledLink from 'components/Link/StyledLink/StyledLink';
import useAuth, { SocialProvider } from 'features/auth/useAuth';

import useForm from 'hooks/useForm';
import { safeParse } from 'lib/utils/zodHelper';
import styled from 'styled-components';
import { z } from 'zod';
import AuthContainer from './AuthContainer';
import { emailAddress, password } from 'lib/utils/constants';
import Button from 'components/core/Button/Button';

const schema = z.object({
  emailAddress,
  password,
});

const SignupPage = (): JSX.Element => {
  const title = 'Sign-Up';

  type FormValues = z.infer<typeof schema>;
  type FormKeys = keyof FormValues;

  const { authSignInWithRedirect, authSignUp, error, isLoading } = useAuth();

  const defaultFormValues: FormValues = {
    emailAddress: '',
    password: '',
  };

  const { formValues, getDefaultProps } =
    useForm<FormValues>(defaultFormValues);

  function validateForm() {
    const result = safeParse<FormValues>(schema, formValues);

    return result.success;
  }

  function handleSubmit(event: React.FormEvent): void {
    event.preventDefault();
    if (!validateForm()) return;

    authSignUp(formValues.emailAddress, formValues.password).catch(() => {
      // Handle sign-in error
    });
  }

  const handleClick = (provider: SocialProvider) => {
    authSignInWithRedirect(provider).catch((err: unknown) => {
      console.error('Error during social sign-in:', err);
      // Handle error appropriately, e.g., show a notification
    });
  };

  return (
    <>
      <Meta title={title} />
      <AuthContainer
        error={error}
        leftImage={<img alt="" src="/images/face.png" />}
        title="Sign Up">
        <Button
          id="login"
          onClick={() => {
            handleClick(SocialProvider.AMAZON);
          }}>
          Sign up with Amazon
        </Button>
        <Button
          id="login"
          onClick={() => {
            handleClick(SocialProvider.FACEBOOK);
          }}>
          Sign up with Facebook
        </Button>
        <Button
          id="login"
          onClick={() => {
            handleClick(SocialProvider.GOOGLE);
          }}>
          Sign up with Google
        </Button>
        <StyledForm noValidate onSubmit={handleSubmit}>
          <Input.Email
            autoComplete="email"
            label="Email Address"
            multiple={false}
            placeholder="Enter your email"
            required
            spellCheck="false"
            {...getDefaultProps('emailAddress' as FormKeys)}
          />
          <Input.Password
            autoComplete="new-password"
            label="Password"
            placeholder="Enter your password"
            {...getDefaultProps('password' as FormKeys)}
          />
          <InstDiv>
            You will be sent a validation code via email to confirm your
            account.
          </InstDiv>
          <Button id="login" variant="secondary">
            {isLoading ? 'Processing' : 'Submit'}
          </Button>
        </StyledForm>
        <TermsDiv>
          By clicking &quot;Submit&quot; you are agreeing to the{' '}
          <StyledLink to="/terms-of-use">Terms of Use</StyledLink>,{' '}
          <StyledLink to="/privacy-policy">Privacy Policy</StyledLink>, and{' '}
          <StyledLink to="/cookie-use">Cookie Use Policy</StyledLink> of this
          site.
        </TermsDiv>
        <StyledBottomMsg>
          Already have an account? <StyledLink to="/signin">Sign in</StyledLink>
        </StyledBottomMsg>
      </AuthContainer>
    </>
  );
};

SignupPage.displayName = 'SignupPage';
export default SignupPage;

const StyledForm = styled.form`
  padding: 20px 0;
`;
const StyledBottomMsg = styled.div`
  padding: 20px 0;
  text-align: center;
`;
const TermsDiv = styled.div`
  padding: 16px 0;
  font-size: 0.7rem;
`;
const InstDiv = styled.div`
  padding: 16px 0;
  font-size: 0.9rem;
  text-wrap: pretty;
  text-align: center;
`;
