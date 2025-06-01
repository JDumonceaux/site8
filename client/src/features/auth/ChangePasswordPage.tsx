import React, { useId } from 'react';
import Meta from 'components/core/Meta/Meta';

import Input from 'components/Input/Input';
import StyledLink from 'components/Link/StyledLink/StyledLink';
import useAuth from 'features/auth/useAuth';
import useForm from 'hooks/useForm';
import { password } from 'lib/utils/constants';
import { safeParse } from 'lib/utils/zodHelper';
import styled from 'styled-components';
import { z } from 'zod';

import AuthContainer from './AuthContainer';
import Button from 'components/core/Button/Button';

// Define Zod Shape
const schema = z
  .object({
    confirmPassword: password,
    newPassword: password,
    password: password,
  })
  .refine((x) => x.newPassword === x.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type FormValues = z.infer<typeof schema>;

const initialFormValues: FormValues = {
  password: '',
  newPassword: '',
  confirmPassword: '',
};

const ChangePasswordPage = (): JSX.Element => {
  const title = 'Change Password';
  const compId = useId();
  const { authUpdatePassword, error } = useAuth();

  const { formValues, getDefaultProps, setErrors } =
    useForm<FormValues>(initialFormValues);

  function validateForm() {
    const result = safeParse(schema, formValues);
    setErrors(result.error?.issues);
    return result.success;
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!validateForm()) return;

    try {
      await authUpdatePassword(formValues.password, formValues.newPassword);
    } catch {
      // handle error
    }
  }

  return (
    <>
      <Meta title={title} />
      <AuthContainer
        error={error}
        leftImage={<img alt="" src="/images/face.png" />}
        title={title}>
        <StyledForm noValidate onSubmit={handleSubmit}>
          <Input.Password
            label="Current Password"
            placeholder="Current password"
            {...getDefaultProps('password')}
          />
          <Input.Password
            label="New Password"
            placeholder="New password"
            {...getDefaultProps('newPassword')}
            id={`${compId}-newPassword`}
          />
          <Input.Password
            label="Confirm Password"
            placeholder="Confirm password"
            {...getDefaultProps('confirmPassword')}
            id={`${compId}-confirmPassword`}
          />
          <Button id="submit">Submit</Button>
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
