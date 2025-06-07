import type { JSX } from 'react';
import Meta from 'components/core/Meta/Meta';
import Input from 'components/Input/Input';
import StyledLink from 'components/Link/StyledLink/StyledLink';
import useAuth from 'features/auth/useAuth';
import useForm from 'hooks/useForm';
import { safeParse } from 'lib/utils/zodHelper';
import styled from 'styled-components';
import { z } from 'zod';

import AuthContainer from './AuthContainer';
import Button from 'components/core/Button/Button';
import { emailAddress, password } from 'lib/utils/constants';

// Define Zod Shape
const schema = z.object({
  emailAddress: emailAddress,
  password: password,
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

    authSignIn(formValues.emailAddress, formValues.password).catch(() => {
      // Handle sign-in error
    });
  };

  return (
    <>
      <Meta title={title} />
      <AuthContainer
        error={error}
        leftImage={<img alt="" src="/images/face.png" />}
        title="Sign In">
        <StyledForm noValidate onSubmit={handleSubmit}>
          <Input.Email
            autoComplete="email"
            inputMode="email"
            label="Email Address"
            multiple={false}
            placeholder="Enter Email Address"
            required
            spellCheck="false"
            {...getDefaultProps('emailAddress' as FormKeys)}
          />
          <Input.Password
            autoComplete="current-password"
            label="Password"
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
