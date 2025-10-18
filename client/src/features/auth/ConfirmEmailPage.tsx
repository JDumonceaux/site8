import React from 'react';
import Meta from '@components/core/Meta/Meta';
import Input from '@components/Input/Input';
import useAuth from '@features/auth/useAuth';
import { authCode } from '@features/auth/ZodStrings';
import useForm from 'hooks/useForm';
import { safeParse } from 'lib/utils/zodHelper';
import styled from 'styled-components';
import { z } from 'zod';

import AuthContainer from './AuthContainer';

// Define Zod Shape
const schema = z.object({
  authenticationCode: authCode,
  emailAddress: z.string().trim(),
});

const ConfirmEmailPage = (): JSX.Element => {
  const title = 'Confirmation';
  const { authConfirmSignUp, authResendConfirmationCode, error, isLoading } =
    useAuth();

  type FormValues = z.infer<typeof schema>;
  type FormKeys = keyof FormValues;

  const initialFormValues: FormValues = {
    authenticationCode: '',
    emailAddress: '',
  };

  const {
    formValues,
    getDefaultProps,
    getFieldErrors,
    handleChange,
    setErrors,
  } = useForm<FormValues>(initialFormValues);

  function validateForm() {
    const result = safeParse<FormValues>(schema, formValues);
    setErrors(result.error?.issues);
    return result.success;
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!validateForm()) return;

    try {
      await authConfirmSignUp(
        formValues.emailAddress,
        formValues.authenticationCode,
      );
      // Handle successful confirmation
    } catch (err) {
      console.error('Error confirming sign up:', err);
    }
  }

  async function handleResend() {
    try {
      await authResendConfirmationCode(formValues.emailAddress);
    } catch (err) {
      console.error('Error resending code:', err);
    }
  }

  function getStandardInputTextAttributes(fieldName: FormKeys) {
    return {
      errorText: getFieldErrors(fieldName),
      id: fieldName,
      value: formValues[fieldName],
    };
  }

  return (
    <>
      <Meta title={title} />
      <AuthContainer
        error={error}
        leftImage={
          <img
            alt=""
            src="/images/bowler.jpg"
          />
        }
        title="Confirm Email"
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
            {...getDefaultProps('emailAddress')}
          />

          <Input.Number
            autoComplete="one-time-code"
            inputMode="numeric"
            label="Authentication Code"
            maxLength={6}
            onChange={handleChange}
            placeholder="Enter Authentication Code"
            spellCheck="false"
            {...getStandardInputTextAttributes('authenticationCode')}
          />

          <Button2
            id="login"
            type="submit"
          >
            {isLoading ? 'Processing' : 'Submit'}
          </Button2>

          <StyledBottomMsg>
            <button
              onClick={handleResend}
              type="button"
            >
              Resend Code
            </button>
          </StyledBottomMsg>
        </StyledForm>
      </AuthContainer>
    </>
  );
};

export default ConfirmEmailPage;

const StyledForm = styled.form`
  padding: 20px 0;
`;

const StyledBottomMsg = styled.div`
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
`;
