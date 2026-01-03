import { type JSX, useActionState } from 'react';

import Meta from '@components/core/meta/Meta';
import SubmitButton from '@components/ui/button/SubmitButton';
import Input from '@components/ui/input/Input';
import StyledLink from '@components/ui/link/styled-link/StyledLink';
import useAuth from '@features/auth/useAuth';
import { emailAddress, password } from '@types';
import { z } from 'zod';
import AuthContainer from './AuthContainer';
import { createFormAction } from './authFormHelpers';
import { StyledBottomMsg, StyledForm } from './AuthFormStyles';
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
            inputMode="email"
            label="Email Address"
            name="emailAddress"
            placeholder="Enter Email Address"
            spellCheck="false"
          />
          <Input.Password
            {...(state.errors?.password && {
              errors: [{ message: state.errors.password }],
            })}
            autoComplete="current-password"
            label="Password"
            name="password"
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
