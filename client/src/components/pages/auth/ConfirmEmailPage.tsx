import { Button2 } from 'components/form/Button2';
import { EmailField } from 'components/ui/Input';
import InputText from 'components/ui/Input/InputText/InputText';
import Meta from 'components/ui/Meta/Meta';
import useAuth from 'hooks/useAuth';
import { useForm } from 'hooks/useForm';
import { safeParse } from 'lib/utils/zodHelper';
import { useCallback, useMemo } from 'react';
import { styled } from 'styled-components';
import { z } from 'zod';
import AuthContainer from './AuthContainer';
import { authCode } from './ZodStrings';

// Define Zod Shape
const schema = z.object({
  emailAddress: z.string().trim(),
  authenticationCode: authCode,
});

const ConfirmEmailPage = (): JSX.Element => {
  const title = 'Confirmation';

  const { authConfirmSignUp, authResendConfirmationCode, isLoading, error } =
    useAuth();

  type FormValues = z.infer<typeof schema>;
  type keys = keyof FormValues;

  const initialFormValues: FormValues = useMemo(
    () => ({
      emailAddress: '',
      authenticationCode: '',
    }),
    [],
  );

  const {
    formValues,
    getFieldErrors,

    setErrors,
    handleChange,
    getDefaultFields,
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

  const handleResend = useCallback(async () => {
    try {
      await authResendConfirmationCode(formValues.emailAddress);
    } catch (error) {
      console.log('Error: ', error);
    }
  }, [authResendConfirmationCode, formValues.emailAddress]);

  const getStandardInputTextAttributes = (fieldName: keys) => {
    return {
      id: fieldName,
      errorText: getFieldErrors(fieldName),

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
            {...getDefaultFields('emailAddress')}
          />
          <InputText
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
