import { type JSX, useActionState, useCallback } from 'react';

import Meta from '@components/core/meta/Meta';
import Button from '@components/ui/button/Button';
import SubmitButton from '@components/ui/button/SubmitButton';
import Input from '@components/ui/input/Input';
import StyledLink from '@components/ui/link/styled-link/StyledLink';
import useAuth, { SocialProvider } from '@features/auth/useAuth';
import { logError } from '@lib/utils/errorHandler';
import { emailAddress, password } from '@types';
import { z } from 'zod';
import AuthContainer from './AuthContainer';
import { createFormAction } from './authFormHelpers';
import { InstDiv, StyledForm } from './AuthFormStyles';
import FormMessage from './FormMessage';
import styled from 'styled-components';

const schema = z.object({
  emailAddress,
  password,
});

type FormValues = z.infer<typeof schema>;

const SignupPage = (): JSX.Element => {
  const title = 'Sign-Up';

  const { authSignInWithRedirect, authSignUp } = useAuth();

  const signUpAction = createFormAction(schema, async (data: FormValues) => {
    await authSignUp(data.emailAddress, data.password);
  });

  const [state, formAction] = useActionState(signUpAction, {});

  const handleClick = (provider: SocialProvider) => {
    void (async () => {
      try {
        await authSignInWithRedirect(provider);
      } catch (error_) {
        logError(error_, {
          componentName: 'SignupPage',
          operation: 'socialSignIn',
          provider,
        });
        // Handle error appropriately, e.g., show a notification
      }
    })();
  };

  const handleAmazonClick = useCallback(() => {
    handleClick(SocialProvider.AMAZON);
  }, [authSignInWithRedirect]);

  const handleFacebookClick = useCallback(() => {
    handleClick(SocialProvider.FACEBOOK);
  }, [authSignInWithRedirect]);

  const handleGoogleClick = useCallback(() => {
    handleClick(SocialProvider.GOOGLE);
  }, [authSignInWithRedirect]);

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
      >
        <Button
          id="login"
          onClick={handleAmazonClick}
        >
          Sign up with Amazon
        </Button>
        <Button
          id="login"
          onClick={handleFacebookClick}
        >
          Sign up with Facebook
        </Button>
        <Button
          id="login"
          onClick={handleGoogleClick}
        >
          Sign up with Google
        </Button>
        <StyledForm
          action={formAction}
          noValidate
        >
          {state.message ? <FormMessage message={state.message} /> : null}
          <Input.Email
            required
            {...(state.errors?.emailAddress && {
              errors: [{ message: state.errors.emailAddress }],
            })}
            autoComplete="email"
            label="Email Address"
            name="emailAddress"
            placeholder="Enter Email Address"
            spellCheck="false"
          />
          <Input.Password
            {...(state.errors?.password && {
              errors: [{ message: state.errors.password }],
            })}
            autoComplete="new-password"
            label="Password"
            name="password"
            placeholder="Enter your password"
          />
          <InstDiv>
            You will be sent a validation code via email to confirm your
            account.
          </InstDiv>
          <SubmitButton
            id="login"
            variant="secondary"
          >
            Submit
          </SubmitButton>
        </StyledForm>
        <TermsDiv>
          By clicking &quot;Submit&quot; you are agreeing to the{' '}
          <StyledLink to="/terms-of-use">Terms of Use</StyledLink>,{' '}
          <StyledLink to="/privacy-policy">Privacy Policy</StyledLink>, and{' '}
          <StyledLink to="/cookie-use">Cookie Use Policy</StyledLink> of this
          site.
        </TermsDiv>
        <StyledBottomMsgCenter>
          Already have an account?
          <StyledLink to="/signin">Sign in</StyledLink>
        </StyledBottomMsgCenter>
      </AuthContainer>
    </>
  );
};

SignupPage.displayName = 'SignupPage';
export default SignupPage;

const StyledBottomMsgCenter = styled.div`
  padding: 20px 0;
  text-align: center;
`;

const TermsDiv = styled.div`
  padding: 16px 0;
  font-size: 0.7rem;
`;
