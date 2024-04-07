import { useCallback } from 'react';
import useAuth from 'hooks/useAuth';
import { z } from 'zod';
import { safeParse } from 'utils/zodHelper';

import { Meta } from 'components';
import { Button2 } from 'components/ui/Form';

import { useForm } from 'hooks/useForm';

import { styled } from 'styled-components';
import { AuthContainer } from './AuthContainer';
import { authCode } from './ZodStrings';
import { EmailField } from 'components/ui/Form/Input/EmailField/EmailField';
import { TextInput } from 'components/ui/Form/Input/TextInput';

// Define Zod Shape
const pageSchema = z.object({
  emailAddress: z.string().trim(),
  authenticationCode: authCode,
});

export const ConfirmEmailPage = (): JSX.Element => {
  const title = 'Confirmation';
  const { authConfirmSignUp, authResendConfirmationCode, isLoading, error } =
    useAuth();
  type FormValues = { emailAddress: string; authenticationCode: string };

  const { formValues, setFormValues, errors, setErrors } = useForm<FormValues>({
    emailAddress: '',
    authenticationCode: '',
  });

  type keys = keyof FormValues;

  const hasError = (fieldName: keys) => {
    return !getFieldErrors(fieldName);
  };

  const validateForm = useCallback(() => {
    const result = safeParse<FormValues>(pageSchema, formValues);
    setErrors(result.errorFormatted);
    return result.success;
  }, [formValues, setErrors]);

  const getFieldErrors = useCallback(
    (fieldName: keys) => {
      return errors && errors[fieldName]?._errors;
    },
    [errors],
  );

  const handleSubmit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      if (validateForm()) {
        try {
          await authConfirmSignUp(
            formValues.emailAddress,
            formValues.authenticationCode,
          );
          // Handle successful sign-up
        } catch (error) {
          console.log('Error: ', error);
        }
      }
    },
    [
      validateForm,
      authConfirmSignUp,
      formValues.emailAddress,
      formValues.authenticationCode,
    ],
  );

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleResend = useCallback(async () => {
    try {
      await authResendConfirmationCode(formValues.emailAddress);
    } catch (error) {
      console.log('Error: ', error);
    }
  }, [authResendConfirmationCode, formValues.emailAddress]);

  const getStandardTextInputAttributes = (fieldName: keys) => {
    return {
      id: fieldName,
      errorText: getFieldErrors(fieldName),
      hasError: hasError(fieldName),
      value: formValues[fieldName],
    };
  };

  return (
    <>
      <Meta title={title} />
      <AuthContainer
        error={error}
        leftImage={<img alt="" src="/images/bowler.jpg" />}
        title="Confirm Email">
        <StyledForm noValidate onSubmit={handleSubmit}>
          <EmailField
            autoComplete="email"
            errorTextShort="Please enter an email address"
            inputMode="email"
            label="Email Address"
            multiple={false}
            onChange={handleChange}
            placeholder="Enter Email Address"
            required
            spellCheck="false"
            type="email"
            {...getStandardTextInputAttributes('emailAddress')}
          />
          <TextInput
            autoComplete="one-time-code"
            errorTextShort="Please enter an authentication code"
            helpText={['Check your email for the authentication code.']}
            inputMode="numeric"
            label="Authentication Code"
            maxLength={6}
            onChange={handleChange}
            placeholder="Enter Authentication Code"
            showCounter
            spellCheck="false"
            {...getStandardTextInputAttributes('authenticationCode')}
          />
          <Button2 id="login" type="submit">
            {isLoading ? 'Processing' : 'Submit'}
          </Button2>
          <StyledBottomMsg>
            <button onClick={handleResend} type="button">
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
