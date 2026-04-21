import type { JSX } from 'react';
import { useActionState, useCallback, useState } from 'react';

import Button from '@common/button/Button';
import Input from '@common/input/Input';
import Meta from '@common/meta/Meta';
import useAuth from '@feature/auth/useAuth';
import { logError } from '@lib/utils/errorHandler';
import { getFieldErrors, safeParse } from '@lib/utils/schemaHelper';
import type { BaseIssue } from 'valibot';
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

  const [formValues, setFormValues] = useState(initialFormValues);
  const [errors, setErrors] = useState<BaseIssue<unknown>[] | null>(null);

  const setField = (fieldName: FormKeys, value: string): void => {
    setFormValues((prev) => ({ ...prev, [fieldName]: value }));
  };

  const validateForm = (): boolean => {
    const result = safeParse(schema, formValues);
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

  const [actionState, formAction, isPending] = useActionState(submitAction, {});

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

  const getStandardInputTextAttributes = (
    fieldName: FormKeys,
  ): {
    errorText: string | string[] | undefined;
    id: string;
    value: string;
  } => ({
    errorText: getFieldErrors(errors, fieldName) ?? undefined,
    id: fieldName,
    value: formValues[fieldName],
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
            {...getStandardInputTextAttributes('emailAddress')}
            onChange={(e) => {
              setField('emailAddress', e.target.value);
            }}
          />
          <Input.Number
            autoComplete="one-time-code"
            inputMode="numeric"
            label="Authentication Code"
            maxLength={6}
            placeholder="Enter Authentication Code"
            spellCheck="false"
            {...getStandardInputTextAttributes('authenticationCode')}
            onChange={(e) => {
              setField('authenticationCode', e.target.value);
            }}
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
