import React, { type JSX } from 'react';

import Button from '@components/core/button/Button';
import Meta from '@components/core/meta/Meta';
import Input from '@components/input/Input';
import StyledLink from '@components/link/styled-link/StyledLink';
import useAuth from '@features/auth/useAuth';
import useForm from '@hooks/useForm';
import { safeParse } from '@lib/utils/zodHelper';
import { emailAddress, password } from '@types/Auth';
import { z } from 'zod';
import AuthContainer from './AuthContainer';
import styled from 'styled-components';

// Define Zod Shape
const schema = z.object({
  emailAddress,
  password,
});

const ForgotPasswordPage = (): JSX.Element => {
  const title = 'Forgot Password';

  type FormValues = z.infer<typeof schema>;

  const { authResetPassword, error, isLoading } = useAuth();

  const defaultFormValues: FormValues = {
    emailAddress: '',
    password: '',
  };

  const { formValues, getDefaultProps, setErrors } =
    useForm<FormValues>(defaultFormValues);

  const validateForm = () => {
    const result = safeParse<FormValues>(schema, formValues);
    setErrors(result.error?.issues ?? null);
    return result.success;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (validateForm()) {
      void (async () => {
        try {
          await authResetPassword(formValues.emailAddress);
        } catch {
          // Handle error
        }
      })();
    }
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
        title="Forgot Password"
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
            {...getDefaultProps('emailAddress')}
          />
          <InstDiv>
            You will be sent a validation code via email to confirm your
            account.
          </InstDiv>
          <Button
            id="login"
            type="submit"
          >
            {isLoading ? 'Processing' : 'Request Password Change'}
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

const StyledForm = styled.form`
  padding: 20px 0;
`;

const InstDiv = styled.div`
  padding: 16px 0;
  font-size: 0.9rem;
  text-wrap: pretty;
  text-align: center;
`;

const StyledBottomMsg = styled.div`
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
`;
