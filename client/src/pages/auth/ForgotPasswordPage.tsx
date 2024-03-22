import { Meta } from 'components/common/Meta';

import { APP_NAME } from 'utils/constants';
import { useCallback, useEffect, useMemo } from 'react';

import { Button2, TextInput } from 'components/ui/Form';

import useAuth from 'services/hooks/useAuth';
import { z } from 'zod';
import { useForm } from 'services/hooks/useForm';
import { safeParse } from 'utils/zodHelper';

import { AuthContainer } from './AuthContainer';
import { styled } from 'styled-components';
import { emailAddress, password } from './ZodStrings';
import { StyledLink } from 'components/ui/Form/StyledLink';

// Define Zod Shape
const schema = z.object({
  emailAddress: emailAddress,
  password: password,
});

export const ForgotPasswordPage = (): JSX.Element => {
  const title = 'Forgot Password';

  const { authResetPassword, isLoading, error } = useAuth();

  type FormValues = z.infer<typeof schema>;
  type keys = keyof FormValues;
  const defaultFormValues: FormValues = useMemo(
    () => ({
      emailAddress: '',
      password: '',
    }),
    [],
  );
  const { formValues, setFormValues, errors, setErrors } =
    useForm<FormValues>(defaultFormValues);

  const validateForm = useCallback(() => {
    const result = safeParse<FormValues>(schema, formValues);
    setErrors(result.errorFormatted);
    return result.success;
  }, [formValues, setErrors]);

  const handleSubmit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      if (validateForm()) {
        try {
          await authResetPassword(formValues.emailAddress);
        } catch (error) {
          // Handle sign-up error
        }
      }
    },
    [validateForm, authResetPassword, formValues.emailAddress],
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

  const hasError = (fieldName: keys) => {
    return !getFieldErrors(fieldName);
  };

  const getFieldErrors = useCallback(
    (fieldName: keys) => {
      return errors && errors[fieldName]?._errors;
    },
    [errors],
  );

  const getStandardTextInputAttributes = (fieldName: keys) => {
    return {
      id: fieldName,
      errorText: getFieldErrors(fieldName),
      hasError: hasError(fieldName),
      value: formValues[fieldName],
    };
  };

  useEffect(() => {
    document.title = `${APP_NAME} - ${title}`;
  }, []);

  return (
    <>
      <Meta title={title} />
      <AuthContainer
        error={error}
        leftImage={<img alt="" src="/images/face.png" />}
        title="Forgot Password">
        <StyledForm
          // aria-errormessage={error ? 'error' : undefined}
          // aria-invalid={error ? 'true' : 'false'}
          noValidate
          onSubmit={handleSubmit}>
          <TextInput
            autoComplete="on"
            errorTextShort="Please enter an email address"
            inputMode="email"
            label="Email Address"
            onChange={handleChange}
            placeholder="Enter Email Address"
            required
            spellCheck="false"
            type="email"
            {...getStandardTextInputAttributes('emailAddress')}
          />
          <InstDiv>
            You will be sent a validation code via email to confirm your
            account.
          </InstDiv>
          <Button2 id="login" type="submit">
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
