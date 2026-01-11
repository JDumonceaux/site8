import { type JSX, useActionState } from 'react';

import Meta from '@components/core/meta/Meta';
import SubmitButton from '@components/ui/button/SubmitButton';
import Input from '@components/ui/input/Input';
import StyledLink from '@components/ui/link/styled-link/StyledLink';
import useAuth from '@features/auth/useAuth';
import { emailAddress } from '@types';
import * as v from 'valibot';
import AuthContainer from './AuthContainer';
import { createFormAction } from './authFormHelpers';
import { InstDiv, StyledBottomMsg, StyledForm } from './AuthFormStyles';
import FormMessage from './FormMessage';

const schema = v.object({
  emailAddress,
});

type FormValues = v.InferOutput<typeof schema>;

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

  const [state, formAction] = useActionState(resetPasswordAction, {});

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
          action={formAction}
          noValidate
        >
          {state.message ? <FormMessage message={state.message} /> : null}
          <Input.Email
            required
            {...(state.errors?.email && {
              errors: [{ message: state.errors.email }],
            })}
            autoComplete="email"
            inputMode="email"
            label="Email Address"
            placeholder="Enter Email Address"
            spellCheck="false"
          />
          <InstDiv>
            You will be sent a validation code via email to confirm your
            account.
          </InstDiv>
          <SubmitButton
            id="login"
            loadingText="Processing"
          >
            Request Password Change
          </SubmitButton>
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
