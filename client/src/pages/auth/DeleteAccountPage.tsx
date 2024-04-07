import { useCallback } from 'react';
import { Meta } from 'components';
import { Button2 } from 'components/ui/Form';

import { z } from 'zod';
import { safeParse } from 'utils/zodHelper';
import useAuth from 'hooks/useAuth';
import { useForm } from 'hooks/useForm';
import { styled } from 'styled-components';
import { AuthContainer } from './AuthContainer';
import { StyledLink } from 'components/ui/Form/StyledLink';
import { TextInput } from 'components/ui/Form/Input';

// Define Zod Shape
const schema = z.object({
  deleteCode: z.literal('delete'),
});

export const DeleteAccountPage = (): JSX.Element => {
  const title = 'Delete Account';

  const { authDeleteUser, isLoading, error } = useAuth();

  type FormValues = {
    deleteCode?: string;
  };
  type keys = keyof FormValues;
  const { formValues, setFormValues, errors, setErrors } = useForm<FormValues>({
    deleteCode: '',
  });

  const hasError = (fieldName: keys) => {
    return !getFieldErrors(fieldName);
  };

  const validateForm = useCallback(() => {
    const result = safeParse<FormValues>(schema, formValues);
    setErrors(result.errorFormatted);
    return result.success;
  }, [formValues, setErrors]);

  const getFieldErrors = useCallback(
    (fieldName: keys) => {
      return errors && errors[fieldName]?._errors;
    },
    [errors],
  );

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

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getStandardTextInputAttributes = (fieldName: keys) => {
    return {
      id: fieldName,
      errorText: getFieldErrors(fieldName),
      hasError: hasError(fieldName),
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
          <TextInput
            autoComplete="off"
            errorTextShort="Required"
            inputMode="text"
            label="Please enter 'delete' to confirm"
            onChange={handleChange}
            placeholder="delete"
            required
            spellCheck="false"
            type="text"
            {...getStandardTextInputAttributes('deleteCode')}
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
