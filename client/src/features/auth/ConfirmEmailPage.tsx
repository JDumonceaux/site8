import { useCallback, useMemo } from 'react';

import Meta from 'components/core/Meta/Meta';
import Button2 from 'components/form/Button2/Button2';
import Input from 'components/Input/Input';
import useAuth from 'features/auth/useAuth';
import { authCode } from 'features/auth/ZodStrings';
import useForm from 'hooks/useForm';
import { safeParse } from 'lib/utils/zodHelper';
import { styled } from 'styled-components';
import { z } from 'zod';

import AuthContainer from './AuthContainer';

// Define Zod Shape
const schema = z.object({
  authenticationCode: authCode,
  emailAddress: z.string().trim(),
});

const ConfirmEmailPage = (): React.JSX.Element => {
  const title = 'Confirmation';

  const { authConfirmSignUp, authResendConfirmationCode, error, isLoading } =
    useAuth();

  type FormValues = z.infer<typeof schema>;
  type FormKeys = keyof FormValues;

  const initialFormValues: FormValues = useMemo(
    () => ({
      authenticationCode: '',
      emailAddress: '',
    }),
    [],
  );

  const {
    formValues,
    getDefaultProps,
    getFieldErrors,
    handleChange,
    setErrors,
  } = useForm<FormValues>(initialFormValues);

  const validateForm = useCallback(() => {
    const result = safeParse<FormValues>(schema, formValues);
    setErrors(result.error?.issues);
    return result.success;
  }, [formValues, setErrors]);

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
          console.log('Error:', error);
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

  const handleResend = useCallback(async () => {
    try {
      await authResendConfirmationCode(formValues.emailAddress);
    } catch (error) {
      console.log('Error:', error);
    }
  }, [authResendConfirmationCode, formValues.emailAddress]);

  const getStandardInputTextAttributes = (fieldName: FormKeys) => {
    return {
      errorText: getFieldErrors(fieldName),
      id: fieldName,

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
          <Input.Email
            autoComplete="email"
            //   errorTextShort="Please enter an email address"
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
            // errorTextShort="Please enter an authentication code"
            // helpText={['Check your email for the authentication code.']}
            inputMode="numeric"
            label="Authentication Code"
            maxLength={6}
            onChange={handleChange}
            placeholder="Enter Authentication Code"
            // showCounter
            spellCheck="false"
            {...getStandardInputTextAttributes('authenticationCode')}
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
