import type { JSX } from 'react';
import { useActionState } from 'react';

import Button from '@components/ui/button/Button';
import Meta from '@components/core/meta/Meta';
import Input from '@components/ui/input/Input';
import useAuth from '@features/auth/useAuth';
import useForm from '@hooks/useForm';
import { logError } from '@lib/utils/errorHandler';
import { safeParse } from '@lib/utils/zodHelper';
import { z } from 'zod';
import AuthContainer from './AuthContainer';
import styled from 'styled-components';

const schema = z.object({
  authenticationCode: z.string().length(6, 'Code must be 6 digits'),
  emailAddress: z.string().pipe(z.email({ message: 'Invalid email address' })),
});

type FormState = {
  message?: string;
  success?: boolean;
};

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

  // Action function for useActionState
  const submitAction = async (
    _prevState: FormState,
    _formData: FormData,
  ): Promise<FormState> => {
    try {
      // Validate form
      if (!validateForm()) {
        return {
          message: 'Validation failed. Please check the form fields.',
          success: false,
        };
      }

      await authConfirmSignUp(
        formValues.emailAddress,
        formValues.authenticationCode,
      );

      return {
        message: 'Email confirmed successfully',
        success: true,
      };
    } catch (error_: unknown) {
      const errorMessage =
        error_ instanceof Error
          ? `Error confirming sign up: ${error_.message}`
          : 'An unexpected error occurred';
      return {
        message: errorMessage,
        success: false,
      };
    }
  };

  const [actionState, formAction, isPending] = useActionState<
    FormState,
    FormData
  >(submitAction, {});

  const handleResend = () => {
    void (async () => {
      try {
        await authResendConfirmationCode(formValues.emailAddress);
      } catch (error_) {
        logError(error_, {
          componentName: 'ConfirmEmailPage',
          operation: 'resendConfirmationCode',
        });
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
        error={actionState.message || error}
      >
        <StyledForm
          noValidate
          action={formAction}
        >
          <Input.Email
            required
            label="Email Address"
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
            {isPending || isLoading ? 'Processing' : 'Submit'}
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
