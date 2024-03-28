import { Meta } from 'components/common/Meta';
import { useCallback, useMemo } from 'react';

import { Button2 } from 'components/ui/Form';

import useAuth from 'services/hooks/useAuth';
import { z } from 'zod';
import { useForm } from 'services/hooks/useForm';
import { safeParse } from 'utils/zodHelper';

import { styled } from 'styled-components';
import { AuthContainer } from './AuthContainer';

import { emailAddress, password } from './ZodStrings';
import { StyledLink } from 'components/ui/Form/StyledLink';
import { EmailField } from 'components/ui/Form/Input/EmailField/EmailField';
import { PasswordField } from 'components/ui/Form/Input/PasswordField';

// Define Zod Shape
const schema = z.object({
  emailAddress: emailAddress,
  password: password,
});

export const SigninPage = (): JSX.Element => {
  const title = 'Sign-In';

  const { authSignIn, isLoading, error } = useAuth();

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
          await authSignIn(formValues.emailAddress, formValues.password);
        } catch (error) {
          // Handle sign-up error
        }
      }
    },
    [validateForm, authSignIn, formValues],
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

  return (
    <>
      <Meta title={title} />
      <AuthContainer
        error={error}
        leftImage={<img alt="" src="/images/face.png" />}
        title="Sign In">
        <StyledForm
          // aria-errormessage={error ? 'error' : undefined}
          // aria-invalid={error ? 'true' : 'false'}
          noValidate
          onSubmit={handleSubmit}>
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
          <PasswordField
            autoComplete="current-password"
            errorTextShort="Please enter a password"
            inputMode="text"
            label="Password"
            maxLength={60}
            onChange={handleChange}
            placeholder="Enter Password"
            required
            type="password"
            {...getStandardTextInputAttributes('password')}
          />
          <Button2 id="login" type="submit" variant="secondary">
            {isLoading ? 'Processing' : 'Submit'}
          </Button2>
        </StyledForm>
        <StyledBottomMsg>
          <StyledLink to="/signup">Sign up</StyledLink>
          <StyledLink to="/password/forgot">Forgot Password?</StyledLink>
        </StyledBottomMsg>
      </AuthContainer>
    </>
  );
};

export default SigninPage;

const StyledForm = styled.form`
  padding: 20px 0;
`;
const StyledBottomMsg = styled.div`
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
`;
