import type { JSX } from 'react';
import { useActionState, useCallback } from 'react';

import Button from '@components/button/Button';
import Input from '@components/input/Input';
import Meta from '@components/meta/Meta';
import useAuth from '@features/auth/useAuth';
import useForm from '@hooks/useForm';
import { logError } from '@lib/utils/errorHandler';
import { safeParse } from '@lib/utils/schemaHelper';
import * as v from 'valibot';
import AuthContainer from './AuthContainer';
import styled from 'styled-components';

const schema = v.object({
  authenticationCode: v.pipe(v.string(), v.length(6, 'Code must be 6 digits')),
  emailAddress: v.pipe(v.string(), v.email('Invalid email address')),
});

type FormState = {
  message?: string;
  success?: boolean;
};

const ConfirmEmailPage = (): JSX.Element => {
  const title = 'Confirmation';
  const { authConfirmSignUp, authResendConfirmationCode, error, isLoading } =
    useAuth();

  type FormValues = v.InferOutput<typeof schema>;
  type FormKeys = keyof FormValues;

  const initialFormValues: FormValues = {
    authenticationCode: '',
    emailAddress: '',
  };

  const { formValues, getDefaultProps, getFieldErrors, setErrors } =
    useForm<FormValues>(initialFormValues);

  const validateForm = () => {
    const result = safeParse<FormValues>(schema, formValues);
    setErrors(result.error ?? null);
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

  const handleResend = useCallback(() => {
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
  }, [authResendConfirmationCode, formValues.emailAddress]);

  const getFormValue = (fieldName: FormKeys): string => {
    return formValues[fieldName];
  };

  const getStandardInputTextAttributes = (
    fieldName: FormKeys,
  ): {
    errorText: string | string[] | undefined;
    id: string;
    value: string;
  } => ({
    errorText: getFieldErrors(fieldName) ?? undefined,
    id: fieldName,
    value: getFormValue(fieldName),
  });

  return (
    <>
      <Meta title={title} />
      <AuthContainer
        error={
          actionState.message
            ? undefined
            : typeof error === 'string'
              ? undefined
              : error
        }
        leftImage={
          <img
            alt=""
            src="/images/bowler.jpg"
          />
        }
        title="Confirm Email"
      >
        <StyledForm
          action={formAction}
          noValidate
        >
          <Input.Email
            autoComplete="email"
            inputMode="email"
            label="Email Address"
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
            placeholder="Enter Authentication Code"
            spellCheck="false"
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
