import { Button2 } from 'components/form/Button2/Button2';

import StyledLink from 'components/Link/StyledLink/StyledLink';
import Meta from 'components/core/Meta/Meta';
import useAuth from 'hooks/useAuth';
import { useForm } from 'hooks/useForm';
import { safeParse } from '../lib/utils/zodHelper';
import { useCallback, useMemo } from 'react';
import { styled } from 'styled-components';
import { z } from 'zod';

import Input from 'components/Input/Input';
import { emailAddress, password } from 'components/pages/auth/ZodStrings';
import AuthContainer from './AuthContainer';

// Define Zod Shape
const schema = z.object({
  // eslint-disable-next-line object-shorthand
  emailAddress: emailAddress,
  // eslint-disable-next-line object-shorthand
  password: password,
});

const ForgotPasswordPage = (): JSX.Element => {
  const title = 'Forgot Password';

  type FormValues = z.infer<typeof schema>;
  type FormKeys = keyof FormValues;

  const { authResetPassword, error, isLoading } = useAuth();

  const defaultFormValues: FormValues = useMemo(
    () => ({
      emailAddress: '',
      password: '',
    }),
    [],
  );

  const { formValues, getDefaultFields, handleChange, setErrors } =
    useForm<FormValues>(defaultFormValues);

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
          await authResetPassword(formValues.emailAddress);
        } catch {
          // Handle sign-up error
        }
      }
    },
    [validateForm, authResetPassword, formValues.emailAddress],
  );

  return (
    <>
      <Meta title={title} />
      <AuthContainer
        error={error}
        leftImage={<img alt="" src="/images/face.png" />}
        title="Forgot Password">
        <StyledForm
          // aria-errormessage={error ? 'error' : undefined}
          // aria-invalid={error ? 'true' : 'false'}
          noValidate
          onSubmit={handleSubmit}>
          <Input.Email
            autoComplete="email"
            //   errorTextShort="Please enter an email address"
            inputMode="email"
            label="Email Address"
            multiple={false}
            onChange={handleChange}
            placeholder="Enter Email Address"
            required
            spellCheck="false"
            {...getDefaultFields('emailAddress' as FormKeys)}
          />
          <InstDiv>
            You will be sent a validation code via email to confirm your
            account.
          </InstDiv>
          <Button2 id="login" type="submit">
            {isLoading ? 'Processing' : 'Request Password Change'}
          </Button2>
        </StyledForm>
        <StyledBottomMsg>
          <StyledLink to="/signin">Sign in</StyledLink>
          <StyledLink to="/signup">Sign up</StyledLink>
        </StyledBottomMsg>
      </AuthContainer>
    </>
  );
};

export default ForgotPasswordPage;

const StyledForm = styled.form`
  padding: 20px 0;
`;
const InstDiv = styled.div`
  padding: 16px 0;
  font-size: 0.9rem;
  text-wrap: pretty;
  text-align: center;
`;
const StyledBottomMsg = styled.div`
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
`;
