import { useCallback, useId, useMemo } from 'react';

import Meta from 'components/core/Meta/Meta';
import Button from 'components/form/Button/Button';
import Input from 'components/Input/Input';
import StyledLink from 'components/Link/StyledLink/StyledLink';
import { emailAddress, password } from 'feature/auth/ZodStrings';
import useAuth from 'hooks/useAuth';
import { useForm } from 'hooks/useForm';
import { safeParse } from 'lib/utils/zodHelper';
import { styled } from 'styled-components';
import { z } from 'zod';

import AuthContainer from './AuthContainer';

// Define Zod Shape
const schema = z.object({
  // eslint-disable-next-line object-shorthand
  emailAddress: emailAddress,
  // eslint-disable-next-line object-shorthand
  password: password,
});

const SigninPage = (): React.JSX.Element => {
  const title = 'Sign-In';
  const compId = useId();

  type FormValues = z.infer<typeof schema>;
  type FormKeys = keyof FormValues;

  const { authSignIn, error, isLoading } = useAuth();

  const defaultFormValues: FormValues = useMemo(
    () => ({
      emailAddress: '',
      password: '',
    }),
    [],
  );

  const {
    formValues,
    getDefaultFields,
    getDefaultPasswordFields,
    handleChange,
    setErrors,
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
        } catch {
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
          <Input.Email
            autoComplete="email"
            //errorTextShort="Please enter an email address"
            inputMode="email"
            label="Email Address"
            multiple={false}
            onChange={handleChange}
            placeholder="Enter Email Address"
            required
            spellCheck="false"
            {...getDefaultFields('emailAddress' as FormKeys)}
          />
          <Input.Password
            autoComplete="current-password"
            //   errorTextShort="Please enter a password"
            label="Password"
            placeholder="Enter Password"
            {...getDefaultPasswordFields('password' as FormKeys, compId)}
          />
          <Button id="login">{isLoading ? 'Processing' : 'Submit'}</Button>
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
