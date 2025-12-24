import { type JSX, useActionState } from 'react';

import Button from '@components/core/button/Button';
import Meta from '@components/core/meta/Meta';
import Input from '@components/input/Input';
import StyledLink from '@components/link/styled-link/StyledLink';
import useAuth from '@features/auth/useAuth';
import { deleteCode } from '@types/Auth';
import { z } from 'zod';
import AuthContainer from './AuthContainer';
import { StyledBottomMsg, StyledForm } from './AuthFormStyles';
import { createFormAction } from './authFormHelpers';
import FormMessage from './FormMessage';

const schema = z.object({
  deleteCode,
});

type FormValues = z.infer<typeof schema>;

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

  const [state, formAction, isPending] = useActionState(
    deleteAccountAction,
    {},
  );

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
          <FormMessage message={state.message} />
          <div>
            Are you sure you want to delete your account? You will lose access
            and all data.
          </div>
          <Input.Text
            required
            errorText={state.errors?.deleteCode}
            label="Please enter 'delete' to confirm"
            spellCheck="false"
            autoComplete="off"
            inputMode="text"
            name="deleteCode"
            placeholder="delete"
          />
          <Button
            disabled={isPending}
            id="login"
          >
            {isPending ? 'Processing' : 'Delete Account'}
          </Button>
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
