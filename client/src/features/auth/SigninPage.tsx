import { type JSX, useActionState } from 'react';

import SubmitButton from '@components/button/SubmitButton';
import Input from '@components/input/Input';
import StyledLink from '@components/link/styled-link/StyledLink';
import Meta from '@components/meta/Meta';
import useAuth from '@features/auth/useAuth';
import { type SignIn, SignInSchema } from '@types';
import AuthContainer from './AuthContainer';
import { createFormAction } from './authFormHelpers';
import { StyledBottomMsg, StyledForm } from './AuthFormStyles';
import FormMessage from './FormMessage';

type FormValues = SignIn;

const SigninPage = (): JSX.Element => {
  const title = 'Sign-In';

  const { authSignIn } = useAuth();

  const signInAction = createFormAction(
    SignInSchema,
    async (data: FormValues) => {
      await authSignIn(data.emailAddress, data.password);
    },
  );

  const [state, formAction] = useActionState(signInAction, {});

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
        title="Sign In"
      >
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
            id="emailAddress"
            inputMode="email"
            label="Email Address"
            placeholder="Enter Email Address"
            spellCheck="false"
          />
          <input
            name="emailAddress"
            type="hidden"
            value=""
          />
          <Input.Password
            {...(state.errors?.password && {
              errors: [{ message: state.errors.password }],
            })}
            autoComplete="current-password"
            id="password"
            label="Password"
            placeholder="Enter Password"
          />
          <input
            name="password"
            type="hidden"
            value=""
          />
          <SubmitButton id="login">Submit</SubmitButton>
        </StyledForm>
        <StyledBottomMsg>
          <StyledLink to="/signup">Sign up</StyledLink>
          <StyledLink to="/password/forgot">Forgot Password?</StyledLink>
        </StyledBottomMsg>
      </AuthContainer>
    </>
  );
};

SigninPage.displayName = 'SigninPage';
export default SigninPage;
