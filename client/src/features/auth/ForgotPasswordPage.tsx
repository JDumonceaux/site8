import { type JSX, useActionState } from 'react';

import Button from '@components/core/button/Button';
import Meta from '@components/core/meta/Meta';
import Input from '@components/input/Input';
import StyledLink from '@components/link/styled-link/StyledLink';
import useAuth from '@features/auth/useAuth';
import { emailAddress } from '@types';
import { z } from 'zod';
import AuthContainer from './AuthContainer';
import { InstDiv, StyledBottomMsg, StyledForm } from './AuthFormStyles';
import { createFormAction } from './authFormHelpers';
import FormMessage from './FormMessage';
const schema = z.object({
  emailAddress,
});

type FormValues = z.infer<typeof schema>;

const ForgotPasswordPage = (): JSX.Element => {
  const title = 'Forgot Password';

  const { authResetPassword } = useAuth();

  const resetPasswordAction = createFormAction(
    schema,
    async (data: FormValues) => {
      await authResetPassword(data.emailAddress);
    },
    'Password reset email sent',
  );

  const [state, formAction, isPending] = useActionState(
    resetPasswordAction,
    {},
  );

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
        title="Forgot Password"
      >
        <StyledForm
          noValidate
          action={formAction}
        >
          {state.message && <FormMessage message={state.message} />}
          <Input.Email
            required
            {...(state.errors?.email && {
              errors: [{ message: state.errors.email }],
            })}
            label="Email Address"
            multiple={false}
            spellCheck="false"
            autoComplete="email"
            inputMode="email"
            name="emailAddress"
            placeholder="Enter Email Address"
          />
          <InstDiv>
            You will be sent a validation code via email to confirm your
            account.
          </InstDiv>
          <Button
            disabled={isPending}
            id="login"
            type="submit"
          >
            {isPending ? 'Processing' : 'Request Password Change'}
          </Button>
        </StyledForm>
        <StyledBottomMsg>
          <StyledLink to="/signin">Sign in</StyledLink>
          <StyledLink to="/signup">Sign up</StyledLink>
        </StyledBottomMsg>
      </AuthContainer>
    </>
  );
};

export default ForgotPasswordPage;
