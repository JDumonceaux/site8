import { PasswordField } from '@aws-amplify/ui-react';
import { Button2 } from 'components/form/Button2';
import { EmailField } from 'components/ui/Input';
import StyledLink from 'components/ui/Link/StyledLink/StyledLink';
import Meta from 'components/ui/Meta/Meta';
import useAuth from 'hooks/useAuth';
import { useForm } from 'hooks/useForm';
import { safeParse } from 'lib/utils/zodHelper';
import { useCallback, useId, useMemo } from 'react';
import { styled } from 'styled-components';
import { z } from 'zod';
import AuthContainer from './AuthContainer';
import { emailAddress, password } from './ZodStrings';

// Define Zod Shape
const schema = z.object({
  // eslint-disable-next-line object-shorthand
  emailAddress: emailAddress,
  // eslint-disable-next-line object-shorthand
  password: password,
});

const SigninPage = (): JSX.Element => {
  const title = 'Sign-In';
  const compId = useId();

  type FormValues = z.infer<typeof schema>;
  type keys = keyof FormValues;

  const { authSignIn, isLoading, error } = useAuth();

  const defaultFormValues: FormValues = useMemo(
    () => ({
      emailAddress: '',
      password: '',
    }),
    [],
  );

  const {
    formValues,
    getDefaultPasswordFields,
    setErrors,
    handleChange,
    getDefaultFields,
  } = useForm<FormValues>(defaultFormValues);

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
          await authSignIn(formValues.emailAddress, formValues.password);
        } catch (error) {
          // Handle sign-up error
        }
      }
    },
    [validateForm, authSignIn, formValues],
  );

  return (
    <>
      <Meta title={title} />
      <AuthContainer
        error={error}
        leftImage={<img alt="" src="/images/face.png" />}
        title="Sign In">
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
          <PasswordField
            autoComplete="current-password"
            //   errorTextShort="Please enter a password"
            label="Password"
            placeholder="Enter Password"
            {...getDefaultPasswordFields('password' as keys, compId)}
          />
          <Button2 id="login" type="submit" variant="secondary">
            {isLoading ? 'Processing' : 'Submit'}
          </Button2>
        </StyledForm>
        <StyledBottomMsg>
          <StyledLink to="/signup">Sign up</StyledLink>
          <StyledLink to="/password/forgot">Forgot Password?</StyledLink>
        </StyledBottomMsg>
      </AuthContainer>
    </>
  );
};

export default SigninPage;

const StyledForm = styled.form`
  padding: 20px 0;
`;
const StyledBottomMsg = styled.div`
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
`;
