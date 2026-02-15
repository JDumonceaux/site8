import { type JSX, useActionState } from 'react';

import Meta from '@components/meta/Meta';
import SubmitButton from '@components/button/SubmitButton';
import Input from '@components/input/Input';
import StyledLink from '@components/link/styled-link/StyledLink';
import useAuth from '@features/auth/useAuth';
import { deleteCode } from '@types';
import * as v from 'valibot';
import AuthContainer from './AuthContainer';
import { createFormAction } from './authFormHelpers';
import { StyledBottomMsg, StyledForm } from './AuthFormStyles';
import FormMessage from './FormMessage';

const schema = v.object({
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
          action={formAction}
          noValidate
        >
          {state.message ? <FormMessage message={state.message} /> : null}
          <div>
            Are you sure you want to delete your account? You will lose access
            and all data.
          </div>
          <Input.Text
            required
            {...(state.errors?.deleteCode && {
              errors: [{ message: state.errors.deleteCode }],
            })}
            autoComplete="off"
            inputMode="text"
            label="Please enter 'delete' to confirm"
            placeholder="delete"
            spellCheck="false"
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
