import Meta from '@components/core/Meta/Meta';
import Input from '@components/Input/Input';
import StyledLink from '@components/Link/StyledLink/StyledLink';
import useAuth from '@features/auth/useAuth';
import useForm from '@hooks/useForm';
import { safeParse } from '@lib/utils/zodHelper';
import styled from 'styled-components';
import { z } from 'zod';
import AuthContainer from './AuthContainer';

const schema = z.object({
  deleteCode: z.literal('delete'),
});

type FormValues = {
  deleteCode?: string;
};
type FormKeys = keyof FormValues;

const initialFormValues: FormValues = {
  deleteCode: '',
};

const DeleteAccountPage = (): JSX.Element => {
  const title = 'Delete Account';
  const { authDeleteUser, error } = useAuth();
  const { formValues, getFieldErrors, handleChange, setErrors } =
    useForm<FormValues>(initialFormValues);

  const validateForm = (): boolean => {
    const result = safeParse<FormValues>(schema, formValues);
    setErrors(result.error?.issues);
    return result.success;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        await authDeleteUser();
      } catch {
        // handle error
      }
    }
  };

  const getDefaultProps = (fieldName: FormKeys) => ({
    errorText: getFieldErrors(fieldName),
    id: fieldName,
    value: formValues[fieldName] ?? '',
  });

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
        error={error}
      >
        <StyledForm
          noValidate
          onSubmit={handleSubmit}
        >
          <div>
            Are you sure you want to delete your account? You will lose access
            and all data.
          </div>
          <Input.Text
            required
            label="Please enter 'delete' to confirm"
            spellCheck="false"
            autoComplete="off"
            inputMode="text"
            onChange={handleChange}
            placeholder="delete"
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

DeleteAccountPage.displayName = 'DeleteAccountPage';
export default DeleteAccountPage;

const StyledForm = styled.form`
  padding: 20px 0;
`;
const StyledBottomMsg = styled.div`
  padding: 20px 0;
  text-align: center;
`;
