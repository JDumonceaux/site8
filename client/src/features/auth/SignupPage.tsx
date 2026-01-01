import { type JSX, useActionState } from 'react';

import Button from '@components/ui/button/Button';
import SubmitButton from '@components/ui/button/SubmitButton';
import Meta from '@components/core/meta/Meta';
import Input from '@components/ui/input/Input';
import StyledLink from '@components/ui/link/styled-link/StyledLink';
import useAuth, { SocialProvider } from '@features/auth/useAuth';
import { emailAddress, password } from '@types';
import { z } from 'zod';
import AuthContainer from './AuthContainer';
import { InstDiv, StyledForm } from './AuthFormStyles';
import { createFormAction } from './authFormHelpers';
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
        // eslint-disable-next-line no-console
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
          action={formAction}
        >
          {state.message && <FormMessage message={state.message} />}
          <Input.Email
            required
            {...(state.errors?.emailAddress && {
              errors: [{ message: state.errors.emailAddress }],
            })}
            label="Email Address"
            multiple={false}
            spellCheck="false"
            autoComplete="email"
            name="emailAddress"
            placeholder="Enter Email Address"
          />
          <Input.Password
            {...(state.errors?.password && {
              errors: [{ message: state.errors.password }],
            })}
            label="Password"
            name="password"
            autoComplete="new-password"
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
