import { type JSX, useActionState } from 'react';

import Button from '@components/core/button-temp/Button';
import Meta from '@components/core/meta-temp/Meta';
import Input from '@components/input-temp/Input';
import StyledLink from '@components/link/styled-link/StyledLink';
import useAuth from '@features/auth/useAuth';
import * as Form from '@radix-ui/react-form';
import type { FormState } from '@shared/types';
import type { ChangePassword } from '@shared/types/Auth';
import AuthContainer from './AuthContainer';
import styled from 'styled-components';

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
    } catch (error_) {
      return {
        fieldData: {},
        message: `Error saving data: ${(error_ as Error).message}`,
      } as FormState<ChangePassword>;
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_state, formAction] = useActionState(postItem, {
    fieldData: { confirmPassword: '', newPassword: '', password: '' },
  } as FormState<ChangePassword>);

  return (
    <>
      <Meta title={title} />
      <AuthContainer
        leftImage={
          <img
            alt=""
            src="/images/face.png"
          />
        }
        title={title}
        error={error}
      >
        <Form.Root action={formAction}>
          <Input.Password
            defaultValue=""
            id="password"
            label="Current Password"
            placeholder="Current password"
          />
          <Input.Password
            defaultValue=""
            id="newPassword"
            label="New Password"
            placeholder="New password"
          />
          <Input.Password
            defaultValue=""
            id="confirmPassword"
            label="Confirm Password"
            placeholder="Confirm password"
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
