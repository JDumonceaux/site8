import StyledLink from 'components/common/Link/StyledLink/StyledLink';
import { Button2 } from 'components/form/Button2';
import { PasswordField } from 'components/form/input/PasswordField';
import Meta from 'components/ui/Meta/Meta';
import useAuth from 'hooks/useAuth';
import { useForm } from 'hooks/useForm';
import { safeParse } from 'lib/utils/zodHelper';
import { useCallback, useId, useMemo } from 'react';
import { styled } from 'styled-components';
import { z } from 'zod';
import AuthContainer from './AuthContainer';
import { password } from './ZodStrings';

// Define Zod Shape
const schema = z
  .object({
    // eslint-disable-next-line object-shorthand
    password: password,
    newPassword: password,
    confirmPassword: password,
  })
  .refine((x) => x.newPassword === x.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

const ChangePasswordPage = (): JSX.Element => {
  const title = 'Change Password';
  const compId = useId();

  const { authUpdatePassword, isLoading, error } = useAuth();

  type FormValues = z.infer<typeof schema>;
  type keys = keyof FormValues;

  const initialFormValues: FormValues = useMemo(
    () => ({
      id: 0,
      name: '',
      to: '',
      url: '',
      text: '',
      password: '',
      newPassword: '',
      confirmPassword: '',
    }),
    [],
  );

  const { formValues, setErrors, getDefaultPasswordFields } =
    useForm<FormValues>(initialFormValues);

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
          await authUpdatePassword(formValues.password, formValues.newPassword);
        } catch (error) {
          // Handle sign-up error
        }
      }
    },
    [validateForm, authUpdatePassword, formValues],
  );

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
            label="Current Password"
            placeholder="Current password"
            {...getDefaultPasswordFields('password' as keys, compId)}
          />
          <PasswordField
            autoComplete="new-password"
            errorTextShort="Please enter a password"
            helpText={['8 characters minimum']}
            label="New Password"
            placeholder="New password"
            {...getDefaultPasswordFields('newPassword' as keys, compId)}
          />
          <PasswordField
            autoComplete="new-password"
            errorTextShort="Please enter a password"
            helpText={['8 characters minimum']}
            label="Confirm Password"
            placeholder="Confirm password"
            {...getDefaultPasswordFields('confirmPassword' as keys, compId)}
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
