import { type JSX, useActionState } from 'react';

import SubmitButton from '@components/ui/button/SubmitButton';
import Meta from '@components/core/meta/Meta';
import Input from '@components/ui/input/Input';
import StyledLink from '@components/ui/link/styled-link/StyledLink';
import useAuth from '@features/auth/useAuth';
import { emailAddress, password } from '@types';
import { z } from 'zod';
import AuthContainer from './AuthContainer';
import { StyledBottomMsg, StyledForm } from './AuthFormStyles';
import { createFormAction } from './authFormHelpers';
import FormMessage from './FormMessage';

const schema = z.object({
  emailAddress,
  password,
});

type FormValues = z.infer<typeof schema>;

const SigninPage = (): JSX.Element => {
  const title = 'Sign-In';

  const { authSignIn } = useAuth();

  const signInAction = createFormAction(schema, async (data: FormValues) => {
    await authSignIn(data.emailAddress, data.password);
  });

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
            spellCheck="false"
            autoComplete="email"
            inputMode="email"
            name="emailAddress"
            placeholder="Enter Email Address"
          />
          <Input.Password
            {...(state.errors?.password && {
              errors: [{ message: state.errors.password }],
            })}
            label="Password"
            name="password"
            autoComplete="current-password"
            placeholder="Enter Password"
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
