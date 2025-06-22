import React, { type JSX, useId, useActionState } from 'react';
import Meta from 'components/core/Meta/Meta';

import Input from 'components/Input/Input';
import StyledLink from 'components/Link/StyledLink/StyledLink';
import useAuth from 'features/auth/useAuth';
import { password } from 'lib/utils/constants';
import styled from 'styled-components';
import { z } from 'zod';
import type { FormState } from 'types';
import AuthContainer from './AuthContainer';
import Button from 'components/core/Button/Button';
import * as Form from '@radix-ui/react-form';

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

const ChangePasswordPage = (): JSX.Element => {
  const title = 'Change Password';
  const compId = useId();
  const { authUpdatePassword, error } = useAuth();

  //    await authUpdatePassword(formValues.password, formValues.newPassword);

  const patchItem = async (
    _prevState: unknown,
    formData: FormData,
  ): Promise<FormState> => {
    const temp = Object.fromEntries(formData.entries());
    const data: PageEdit = { ...temp, id: Number(temp.id) } as PageEdit;

    const validationResult = PageEditSchema.safeParse(data);

    if (!validationResult.success) {
      const tempErrors: FormErrors = {};

      // Map each Zod issue into our FormErrors shape
      for (const issue of validationResult.error.issues) {
        const fieldName = issue.path[0] as keyof FormErrors;
        tempErrors[fieldName] = { errors: [] };
        tempErrors[fieldName].errors?.push({
          message: issue.message,
        });
      }

      return {
        fieldData: data,
        fields: tempErrors,
        message: 'Validation error: Invalid data',
      } as unknown as FormState;
    }

    try {
      await authUpdatePassword(formData.password, formData.newPassword);
      return {
        fieldData: data as unknown as Page,
        message: 'Data saved successfully!',
      } as FormState;
    } catch (error) {
      return {
        fieldData: {},
        message: `Error saving data: ${(error as Error).message}`,
      } as FormState;
    }
  };

  const [data, action] = useActionState(patchItem, {
    fieldData: initData,
  } as FormState);

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
            id={`${compId}-currentPassword`}
            defaultValue={''}
          />
          <Input.Password
            label="New Password"
            placeholder="New password"
            id={`${compId}-newPassword`}
            defaultValue={''}
          />
          <Input.Password
            label="Confirm Password"
            placeholder="Confirm password"
            id={`${compId}-confirmPassword`}
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
