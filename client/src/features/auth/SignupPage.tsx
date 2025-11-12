import type { JSX } from 'react';

import Button from '@components/core/button/Button';
import Meta from '@components/core/meta/Meta';
import Input from '@components/input/Input';
import StyledLink from '@components/link/styled-link/StyledLink';
import useAuth, { SocialProvider } from '@features/auth/useAuth';
import useForm from '@hooks/useForm';
import { safeParse } from '@lib/utils/zodHelper';
import styled from 'styled-components';
import { z } from 'zod';
import { emailAddress, password } from '../../types/Auth';
import AuthContainer from './AuthContainer';

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

  const validateForm = () => {
    const result = safeParse<FormValues>(schema, formValues);

    return result.success;
  };

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    if (!validateForm()) return;

    void (async () => {
      try {
        await authSignUp(formValues.emailAddress, formValues.password);
      } catch {
        // Handle sign-in error
      }
    })();
  };

  const handleClick = (provider: SocialProvider) => {
    void (async () => {
      try {
        await authSignInWithRedirect(provider);
      } catch (error_) {
        console.error('Error during social sign-in:', error_);
        // Handle error appropriately, e.g., show a notification
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
        title="Sign Up"
        error={error}
      >
        <Button
          id="login"
          onClick={() => {
            handleClick(SocialProvider.AMAZON);
          }}
        >
          Sign up with Amazon
        </Button>
        <Button
          id="login"
          onClick={() => {
            handleClick(SocialProvider.FACEBOOK);
          }}
        >
          Sign up with Facebook
        </Button>
        <Button
          id="login"
          onClick={() => {
            handleClick(SocialProvider.GOOGLE);
          }}
        >
          Sign up with Google
        </Button>
        <StyledForm
          noValidate
          onSubmit={handleSubmit}
        >
          <Input.Email
            required
            label="Email Address"
            multiple={false}
            spellCheck="false"
            autoComplete="email"
            placeholder="Enter your email"
            {...getDefaultProps('emailAddress' as FormKeys)}
          />
          <Input.Password
            label="Password"
            autoComplete="new-password"
            placeholder="Enter your password"
            {...getDefaultProps('password' as FormKeys)}
          />
          <InstDiv>
            You will be sent a validation code via email to confirm your
            account.
          </InstDiv>
          <Button
            id="login"
            variant="secondary"
          >
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
          Already have an account?
          <StyledLink to="/signin">Sign in</StyledLink>
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
