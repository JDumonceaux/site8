import { type JSX, useActionState } from 'react';

import SubmitButton from '@components/ui/button/SubmitButton';
import Meta from '@components/core/meta/Meta';
import Input from '@components/ui/input/Input';
import StyledLink from '@components/ui/link/styled-link/StyledLink';
import useAuth from '@features/auth/useAuth';
import { deleteCode } from '@types';
import { z } from 'zod';
import AuthContainer from './AuthContainer';
import { StyledBottomMsg, StyledForm } from './AuthFormStyles';
import { createFormAction } from './authFormHelpers';
import FormMessage from './FormMessage';

const schema = z.object({
  deleteCode,
});

const DeleteAccountPage = (): JSX.Element => {
  const title = 'Delete Account';
  const { authDeleteUser } = useAuth();

  const deleteAccountAction = createFormAction(
    schema,
    async () => {
      await authDeleteUser();
    },
    'Account deleted successfully',
  );

  const [state, formAction] = useActionState(deleteAccountAction, {});

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
        title="Delete Account"
      >
        <StyledForm
          noValidate
          action={formAction}
        >
          {state.message && <FormMessage message={state.message} />}
          <div>
            Are you sure you want to delete your account? You will lose access
            and all data.
          </div>
          <Input.Text
            required
            {...(state.errors?.deleteCode && {
              errors: [{ message: state.errors.deleteCode }],
            })}
            label="Please enter 'delete' to confirm"
            spellCheck="false"
            autoComplete="off"
            inputMode="text"
            name="deleteCode"
            placeholder="delete"
          />
          <SubmitButton id="login">Delete Account</SubmitButton>
        </StyledForm>
        <StyledBottomMsg>
          <StyledLink to="/">Cancel</StyledLink>
        </StyledBottomMsg>
      </AuthContainer>
    </>
  );
};

DeleteAccountPage.displayName = 'DeleteAccountPage';
export default DeleteAccountPage;
