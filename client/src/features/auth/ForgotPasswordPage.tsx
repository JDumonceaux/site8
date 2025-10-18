import React from 'react';
import Meta from '@components/core/Meta/Meta';
import Input from '@components/Input/Input';
import StyledLink from '@components/Link/StyledLink/StyledLink';
import useAuth from '@features/auth/useAuth';
import { emailAddress, password } from '@features/auth/ZodStrings';
import useForm from '@hooks/useForm';
import { safeParse } from '@lib/utils/zodHelper';
import styled from 'styled-components';
import { z } from 'zod';

import AuthContainer from './AuthContainer';

// Define Zod Shape
const schema = z.object({
  emailAddress: emailAddress,
  password: password,
});

const ForgotPasswordPage = (): JSX.Element => {
  const title = 'Forgot Password';

  type FormValues = z.infer<typeof schema>;
  type FormKeys = keyof FormValues;

  const { authResetPassword, error, isLoading } = useAuth();

  const defaultFormValues: FormValues = {
    emailAddress: '',
    password: '',
  };

  const { formValues, getDefaultFields, handleChange, setErrors } =
    useForm<FormValues>(defaultFormValues);

  function validateForm() {
    const result = safeParse<FormValues>(schema, formValues);
    setErrors(result.error?.issues);
    return result.success;
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (validateForm()) {
      try {
        await authResetPassword(formValues.emailAddress);
      } catch {
        // Handle error
      }
    }
  }

  return (
    <>
      <Meta title={title} />
      <AuthContainer
        error={error}
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
          onSubmit={handleSubmit}
        >
          <Input.Email
            autoComplete="email"
            inputMode="email"
            label="Email Address"
            multiple={false}
            onChange={handleChange}
            placeholder="Enter Email Address"
            required
            spellCheck="false"
            {...getDefaultFields('emailAddress' as FormKeys)}
          />
          <InstDiv>
            You will be sent a validation code via email to confirm your
            account.
          </InstDiv>
          <Button2
            id="login"
            type="submit"
          >
            {isLoading ? 'Processing' : 'Request Password Change'}
          </Button2>
        </StyledForm>
        <StyledBottomMsg>
          <StyledLink to="/signin">Sign in</StyledLink>
          <StyledLink to="/signup">Sign up</StyledLink>
        </StyledBottomMsg>
      </AuthContainer>
    </>
  );
};

ForgotPasswordPage;
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
