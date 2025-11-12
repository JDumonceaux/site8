import React, { type JSX } from 'react';

import Button from '@components/core/button/Button';
import Meta from '@components/core/meta/Meta';
import Input from '@components/input/Input';
import useAuth from '@features/auth/useAuth';
import useForm from '@hooks/useForm';
import { safeParse } from '@lib/utils/zodHelper';
import styled from 'styled-components';
import { z } from 'zod';
import AuthContainer from './AuthContainer';

const schema = z.object({
  authenticationCode: z.string().length(6, 'Code must be 6 digits'),
  emailAddress: z.string().pipe(z.email({ message: 'Invalid email address' })),
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

  const { formValues, getDefaultProps, getFieldErrors, setErrors } =
    useForm<FormValues>(initialFormValues);

  const validateForm = () => {
    const result = safeParse<FormValues>(schema, formValues);
    setErrors(result.error?.issues ?? null);
    return result.success;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateForm()) return;

    void (async () => {
      try {
        await authConfirmSignUp(
          formValues.emailAddress,
          formValues.authenticationCode,
        );
        // Handle successful confirmation
      } catch (error_) {
        console.error('Error confirming sign up:', error_);
      }
    })();
  };

  const handleResend = () => {
    void (async () => {
      try {
        await authResendConfirmationCode(formValues.emailAddress);
      } catch (error_) {
        console.error('Error resending code:', error_);
      }
    })();
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
            placeholder="Enter Email Address"
            {...getDefaultProps('emailAddress')}
          />

          <Input.Number
            label="Authentication Code"
            maxLength={6}
            spellCheck="false"
            autoComplete="one-time-code"
            inputMode="numeric"
            placeholder="Enter Authentication Code"
            {...getStandardInputTextAttributes('authenticationCode')}
          />

          <Button
            id="login"
            type="submit"
          >
            {isLoading ? 'Processing' : 'Submit'}
          </Button>

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
