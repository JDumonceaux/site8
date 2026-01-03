import { type JSX, useActionState } from 'react';

import Meta from '@components/core/meta/Meta';
import SubmitButton from '@components/ui/button/SubmitButton';
import Input from '@components/ui/input/Input';
import StyledLink from '@components/ui/link/styled-link/StyledLink';
import useAuth from '@features/auth/useAuth';
import * as Form from '@radix-ui/react-form';
import type { ChangePassword , FormState } from '@types';
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
        error={error}
        leftImage={
          <img
            alt=""
            src="/images/face.png"
          />
        }
        title={title}
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
          <SubmitButton id="submit">Submit</SubmitButton>
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
