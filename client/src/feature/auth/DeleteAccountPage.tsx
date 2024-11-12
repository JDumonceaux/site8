import { useCallback, useMemo } from 'react';

import Meta from 'components/core/Meta/Meta';
import Button from 'components/form/Button/Button';
import Input from 'components/Input/Input';
import StyledLink from 'components/Link/StyledLink/StyledLink';
import useAuth from 'hooks/useAuth';
import { useForm } from 'hooks/useForm';
import { safeParse } from 'lib/utils/zodHelper';
import { styled } from 'styled-components';
import { z } from 'zod';

import AuthContainer from './AuthContainer';

// Define Zod Shape
const schema = z.object({
  deleteCode: z.literal('delete'),
});

const DeleteAccountPage = (): React.JSX.Element => {
  const title = 'Delete Account';

  const { authDeleteUser, error } = useAuth();

  type FormValues = {
    deleteCode?: string;
  };
  type FormKeys = keyof FormValues;

  const initialFormValues: FormValues = useMemo(
    () => ({
      deleteCode: '',
    }),
    [],
  );

  const { formValues, getFieldErrors, handleChange, setErrors } =
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
          await authDeleteUser();
        } catch {
          // Handle sign-up error
        }
      }
    },
    [validateForm, authDeleteUser],
  );

  const getDefaultProps = (fieldName: FormKeys) => {
    return {
      errorText: getFieldErrors(fieldName),
      id: fieldName,
      value: formValues[fieldName] || '',
    };
  };

  return (
    <>
      <Meta title={title} />
      <AuthContainer
        error={error}
        leftImage={<img alt="" src="/images/face.png" />}
        title="Delete Account">
        <StyledForm
          noValidate
          // aria-errormessage={error ? 'error' : undefined}
          // aria-invalid={error ? 'true' : 'false'}
          // noValidate
          onSubmit={handleSubmit}>
          <div>
            Are you sure you want to delete your account? You will lose access
            and all data.
          </div>
          <Input.Text
            autoComplete="off"
            // errorTextShort="Required"
            inputMode="text"
            label="Please enter 'delete' to confirm"
            onChange={handleChange}
            placeholder="delete"
            required
            spellCheck="false"
            {...getDefaultProps('deleteCode')}
          />
          <Button id="login">Delete Account</Button>
        </StyledForm>
        <StyledBottomMsg>
          <StyledLink to="/">Cancel</StyledLink>
        </StyledBottomMsg>
      </AuthContainer>
    </>
  );
};

export default DeleteAccountPage;

const StyledForm = styled.form`
  padding: 20px 0;
`;
const StyledBottomMsg = styled.div`
  padding: 20px 0;
  text-align: center;
`;
