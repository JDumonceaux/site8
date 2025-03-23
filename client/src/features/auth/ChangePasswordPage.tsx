import { useCallback, useId, useMemo } from 'react';

import Meta from 'components/core/Meta/Meta';
import Button from 'components/form/Button/Button';
import Input from 'components/Input/Input';
import StyledLink from 'components/Link/StyledLink/StyledLink';
import useAuth from 'features/auth/useAuth';
import { password } from 'features/auth/ZodStrings';
import useForm from 'hooks/useForm';
import { safeParse } from 'lib/utils/zodHelper';
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

const ChangePasswordPage = (): React.JSX.Element => {
  const title = 'Change Password';
  const compId = useId();

  const { authUpdatePassword, error } = useAuth();

  type FormValues = z.infer<typeof schema>;
  type FormKeys = keyof FormValues;

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

  const { formValues, getDefaultProps, setErrors } =
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
          <Input.Password
            // autoComplete="current-password"
            // errorTextShort="Please enter a password"
            label="Current Password"
            placeholder="Current password"
            {...getDefaultProps('password' as FormKeys)}
          />
          <Input.Password
            // autoComplete="new-password"
            // errorTextShort="Please enter a password"
            // helpText={['8 characters minimum']}
            label="New Password"
            placeholder="New password"
            {...getDefaultPasswordFields('newPassword' as FormKeys, compId)}
          />
          <Input.Password
            //autoComplete="new-password"
            //errorTextShort="Please enter a password"
            //helpText={['8 characters minimum']}
            label="Confirm Password"
            placeholder="Confirm password"
            {...getDefaultPasswordFields('confirmPassword' as FormKeys, compId)}
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
