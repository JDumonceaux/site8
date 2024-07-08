import { Meta } from 'components';
import { Button2 } from 'components/form';
import { useCallback, useMemo } from 'react';

import useAuth from 'hooks/useAuth';
import { useForm } from 'hooks/useForm';
import { safeParse } from 'utils/zodHelper';
import { z } from 'zod';

import StyledLink from 'components/common/Link/StyledLink/StyledLink';
import { EmailField } from 'components/form/input';
import { styled } from 'styled-components';
import { AuthContainer } from './AuthContainer';
import { emailAddress, password } from './ZodStrings';

// Define Zod Shape
const schema = z.object({
  emailAddress: emailAddress,
  password: password,
});

export const ForgotPasswordPage = (): JSX.Element => {
  const title = 'Forgot Password';

  type FormValues = z.infer<typeof schema>;
  type keys = keyof FormValues;

  const { authResetPassword, isLoading, error } = useAuth();

  const defaultFormValues: FormValues = useMemo(
    () => ({
      emailAddress: '',
      password: '',
    }),
    [],
  );

  const { formValues, setErrors, handleChange, getDefaultFields } =
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
        } catch (error) {
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
          <EmailField
            autoComplete="email"
            errorTextShort="Please enter an email address"
            inputMode="email"
            label="Email Address"
            multiple={false}
            onChange={handleChange}
            placeholder="Enter Email Address"
            required
            spellCheck="false"
            type="email"
            {...getDefaultFields('emailAddress' as keys)}
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
