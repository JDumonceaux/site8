import React from 'react';

import Meta from '@/components/core/meta/Meta';
import Input from '@/components/input/Input';
import useAuth from '@features/auth/useAuth';
import { authCode } from '@features/auth/ZodStrings';
import useForm from '@hooks/useForm';
import { safeParse } from '@lib/utils/zodHelper';
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

  const validateForm = () => {
    const result = safeParse<FormValues>(schema, formValues);
    setErrors(result.error?.issues);
    return result.success;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateForm()) return;

    try {
      await authConfirmSignUp(
        formValues.emailAddress,
        formValues.authenticationCode,
      );
      // Handle successful confirmation
    } catch (error_) {
      console.error('Error confirming sign up:', error_);
    }
  };

  const handleResend = async () => {
    try {
      await authResendConfirmationCode(formValues.emailAddress);
    } catch (error_) {
      console.error('Error resending code:', error_);
    }
  };

  const getStandardInputTextAttributes = (fieldName: FormKeys) => ({
    errorText: getFieldErrors(fieldName),
    id: fieldName,
    value: formValues[fieldName],
  });

  return (
    <>
      <Meta title={title} />
      <AuthContainer
        leftImage={
          <img
            alt=""
            src="/images/bowler.jpg"
          />
        }
        title="Confirm Email"
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
            onChange={handleChange}
            placeholder="Enter Email Address"
            {...getDefaultProps('emailAddress')}
          />

          <Input.Number
            label="Authentication Code"
            maxLength={6}
            spellCheck="false"
            autoComplete="one-time-code"
            inputMode="numeric"
            onChange={handleChange}
            placeholder="Enter Authentication Code"
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
              type="button"
              onClick={handleResend}
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
