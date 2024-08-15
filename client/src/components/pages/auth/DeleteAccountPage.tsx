import { Button2 } from 'components/form/Button2';

import InputText from 'components/ui/Input/InputText/InputTele';
import StyledLink from 'components/ui/Link/StyledLink/StyledLink';
import Meta from 'components/ui/Meta/Meta';
import useAuth from 'hooks/useAuth';
import { useForm } from 'hooks/useForm';
import { safeParse } from 'lib/utils/zodHelper';
import { useCallback, useMemo } from 'react';
import { styled } from 'styled-components';
import { z } from 'zod';
import AuthContainer from './AuthContainer';

// Define Zod Shape
const schema = z.object({
  deleteCode: z.literal('delete'),
});

const DeleteAccountPage = (): JSX.Element => {
  const title = 'Delete Account';

  const { authDeleteUser, isLoading, error } = useAuth();

  type FormValues = {
    deleteCode?: string;
  };
  type keys = keyof FormValues;

  const initialFormValues: FormValues = useMemo(
    () => ({
      deleteCode: '',
    }),
    [],
  );

  const { formValues, getFieldErrors, setErrors, handleChange } =
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
        } catch (error) {
          // Handle sign-up error
        }
      }
    },
    [validateForm, authDeleteUser],
  );

  const getStandardInputTextAttributes = (fieldName: keys) => {
    return {
      id: fieldName,
      errorText: getFieldErrors(fieldName),

      value: formValues[fieldName],
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
          <InputText
            autoComplete="off"
            errorTextShort="Required"
            inputMode="text"
            label="Please enter 'delete' to confirm"
            onChange={handleChange}
            placeholder="delete"
            required
            spellCheck="false"
            type="text"
            {...getStandardInputTextAttributes('deleteCode')}
          />

          <Button2 id="login" type="submit" variant="secondary">
            {isLoading ? 'Processing' : 'Delete Account'}
          </Button2>
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
