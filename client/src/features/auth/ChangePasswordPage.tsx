import { type JSX, useActionState } from 'react';
import Meta from 'components/core/Meta/Meta';

import Input from 'components/Input/Input';
import StyledLink from 'components/Link/StyledLink/StyledLink';
import useAuth from 'features/auth/useAuth';
import styled from 'styled-components';
import type { FormState } from 'types';
import AuthContainer from './AuthContainer';
import Button from 'components/core/Button/Button';
import * as Form from '@radix-ui/react-form';
import type { ChangePassword } from 'types/Auth';

const ChangePasswordPage = (): JSX.Element => {
  const title = 'Change Password';
  const { authUpdatePassword, error } = useAuth();

  //    await authUpdatePassword(formValues.password, formValues.newPassword);

  const postItem = async (
    _prevState: unknown,
    formData: FormData,
  ): Promise<FormState<ChangePassword>> => {
    const temp = Object.fromEntries(formData.entries());
    const data: ChangePassword = { ...temp } as ChangePassword;

    try {
      await authUpdatePassword(data.password, data.newPassword);
      return {
        fieldData: data as unknown as ChangePassword,
      } as FormState<ChangePassword>;
    } catch (err) {
      return {
        fieldData: {},
        message: `Error saving data: ${(err as Error).message}`,
      } as FormState<ChangePassword>;
    }
  };

  const [data, action] = useActionState(postItem, {
    fieldData: { password: '', newPassword: '', confirmPassword: '' },
  } as FormState<ChangePassword>);

  return (
    <>
      <Meta title={title} />
      <AuthContainer
        error={error}
        leftImage={<img alt="" src="/images/face.png" />}
        title={title}>
        <Form.Root action={action}>
          <Input.Password
            label="Current Password"
            placeholder="Current password"
            id={`password`}
            defaultValue={''}
          />
          <Input.Password
            label="New Password"
            placeholder="New password"
            id={`newPassword`}
            defaultValue={''}
          />
          <Input.Password
            label="Confirm Password"
            placeholder="Confirm password"
            id={`confirmPassword`}
            defaultValue={''}
          />
          <Button id="submit">Submit</Button>
        </Form.Root>
        <StyledBottomMsg>
          <StyledLink to="/">Cancel</StyledLink>
        </StyledBottomMsg>
      </AuthContainer>
    </>
  );
};

export default ChangePasswordPage;

const StyledBottomMsg = styled.div`
  padding: 20px 0;
  text-align: center;
`;
