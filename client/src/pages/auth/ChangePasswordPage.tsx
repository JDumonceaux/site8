import Button from 'components/form/Button/Button';
import { PasswordField } from 'components/Input/PasswordField';
import StyledLink from 'components/Link/StyledLink/StyledLink';
import Meta from 'components/Meta/Meta';
import { password } from 'components/pages/auth/ZodStrings';
import useAuth from 'hooks/useAuth';
import { useForm } from 'hooks/useForm';
import { safeParse } from 'lib/utils/zodHelper';
import { useCallback, useId, useMemo } from 'react';
import { styled } from 'styled-components';
import { z } from 'zod';
import AuthContainer from './AuthContainer';

// Define Zod Shape
const schema = z
  .object({
    confirmPassword: password,
    newPassword: password,
    // eslint-disable-next-line object-shorthand
    password: password,
  })
  .refine((x) => x.newPassword === x.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

const ChangePasswordPage = (): JSX.Element => {
  const title = 'Change Password';
  const compId = useId();

  const { authUpdatePassword, error, isLoading } = useAuth();

  type FormValues = z.infer<typeof schema>;
  type keys = keyof FormValues;

  const initialFormValues: FormValues = useMemo(
    () => ({
      confirmPassword: '',
      id: 0,
      name: '',
      newPassword: '',
      password: '',
      text: '',
      to: '',
      url: '',
    }),
    [],
  );

  const { formValues, getDefaultPasswordFields, setErrors } =
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
        } catch {
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
            // autoComplete="current-password"
            // errorTextShort="Please enter a password"
            label="Current Password"
            placeholder="Current password"
            {...getDefaultPasswordFields('password' as keys, compId)}
          />
          <PasswordField
            // autoComplete="new-password"
            // errorTextShort="Please enter a password"
            // helpText={['8 characters minimum']}
            label="New Password"
            placeholder="New password"
            {...getDefaultPasswordFields('newPassword' as keys, compId)}
          />
          <PasswordField
            //autoComplete="new-password"
            //errorTextShort="Please enter a password"
            //helpText={['8 characters minimum']}
            label="Confirm Password"
            placeholder="Confirm password"
            {...getDefaultPasswordFields('confirmPassword' as keys, compId)}
          />
          <Button id="login">Submit</Button>
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
