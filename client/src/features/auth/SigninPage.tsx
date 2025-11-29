import type { JSX } from 'react';

import Button from '@components/core/button/Button';
import Meta from '@components/core/meta/Meta';
import Input from '@components/input/Input';
import StyledLink from '@components/link/styled-link/StyledLink';
import useAuth from '@features/auth/useAuth';
import useForm from '@hooks/useForm';
import { safeParse } from '@lib/utils/zodHelper';
import { emailAddress, password } from '@shared/types/Auth';
import { z } from 'zod';
import AuthContainer from './AuthContainer';
import styled from 'styled-components';

const schema = z.object({
  emailAddress,
  password,
});

const SigninPage = (): JSX.Element => {
  const title = 'Sign-In';

  type FormValues = z.infer<typeof schema>;
  type FormKeys = keyof FormValues;

  const { authSignIn, error, isLoading } = useAuth();

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
        await authSignIn(formValues.emailAddress, formValues.password);
      } catch {
        // Handle sign-in error
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
        title="Sign In"
        error={error}
      >
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
            inputMode="email"
            placeholder="Enter Email Address"
            {...getDefaultProps('emailAddress' as FormKeys)}
          />
          <Input.Password
            label="Password"
            autoComplete="current-password"
            placeholder="Enter Password"
            {...getDefaultProps('password' as FormKeys)}
          />
          <Button id="login">{isLoading ? 'Processing' : 'Submit'}</Button>
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

const StyledForm = styled.form`
  padding: 20px 0;
`;

const StyledBottomMsg = styled.div`
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
`;
