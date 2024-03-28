import { useCallback, useId } from 'react';
import { Meta } from 'components';
import { Button2 } from 'components/ui/Form';

import { z } from 'zod';
import { safeParse } from 'utils/zodHelper';
import useAuth from 'services/hooks/useAuth';
import { useForm } from 'services/hooks/useForm';
import { PasswordField } from 'components/ui/Form/PasswordField';

import { styled } from 'styled-components';
import { AuthContainer } from './AuthContainer';
import { StyledLink } from 'components/ui/Form/StyledLink';
import { password } from './ZodStrings';

// Define Zod Shape
const schema = z
  .object({
    password: password,
    newPassword: password,
    confirmPassword: password,
  })
  .refine((x) => x.newPassword === x.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const ChangePasswordPage = (): JSX.Element => {
  const title = 'Change Password';
  const compId = useId();

  const { authUpdatePassword, isLoading, error } = useAuth();

  type FormValues = z.infer<typeof schema>;
  type keys = keyof FormValues;
  const { formValues, setFormValues, errors, setErrors } = useForm<FormValues>({
    password: '',
    newPassword: '',
    confirmPassword: '',
  });

  const hasError = (fieldName: keys) => {
    return !getFieldErrors(fieldName);
  };

  const validateForm = useCallback(() => {
    const result = safeParse<FormValues>(schema, formValues);
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
          await authUpdatePassword(formValues.password, formValues.newPassword);
        } catch (error) {
          // Handle sign-up error
        }
      }
    },
    [validateForm, authUpdatePassword, formValues],
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

  const getStandardTextInputAttributes = (fieldName: keys) => {
    return {
      id: `${fieldName}-${compId}`,
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
        title="Change Password">
        <StyledForm
          noValidate
          // aria-errormessage={error ? 'error' : undefined}
          // aria-invalid={error ? 'true' : 'false'}
          // noValidate
          onSubmit={handleSubmit}>
          <PasswordField
            autoComplete="current-password"
            errorTextShort="Please enter a password"
            inputMode="text"
            label="Current Password"
            maxLength={60}
            onChange={handleChange}
            placeholder="Current password"
            required
            showCounter
            type="password"
            {...getStandardTextInputAttributes('password')}
          />
          <PasswordField
            autoComplete="new-password"
            errorTextShort="Please enter a password"
            helpText={['8 characters minimum']}
            inputMode="text"
            label="New Password"
            maxLength={60}
            onChange={handleChange}
            placeholder="New password"
            required
            showCounter
            type="password"
            {...getStandardTextInputAttributes('newPassword')}
          />
          <PasswordField
            autoComplete="new-password"
            errorTextShort="Please enter a password"
            helpText={['8 characters minimum']}
            inputMode="text"
            label="Confirm Password"
            maxLength={60}
            onChange={handleChange}
            placeholder="Confirm password"
            required
            showCounter
            type="password"
            {...getStandardTextInputAttributes('confirmPassword')}
          />

          <Button2 id="login" type="submit" variant="secondary">
            {isLoading ? 'Processing' : 'Submit'}
          </Button2>
        </StyledForm>
        <StyledBottomMsg>
          <StyledLink to="/">Cancel</StyledLink>
        </StyledBottomMsg>
      </AuthContainer>
    </>
  );
};

export default ChangePasswordPage;

const StyledForm = styled.form`
  padding: 20px 0;
`;
const StyledBottomMsg = styled.div`
  padding: 20px 0;
  text-align: center;
`;
