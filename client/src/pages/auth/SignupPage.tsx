import { useCallback, useMemo } from 'react';
import { Meta } from 'components';
import { Button2 } from 'components/ui/Form';
import { z } from 'zod';
import { safeParse } from 'utils/zodHelper';
import useAuth, { SocialProvider } from 'hooks/useAuth';
import { useForm } from 'hooks/useForm';

import { Facebook } from 'components/ui/Icons/Facebook';
import { Amazon } from 'components/ui/Icons/Amazon';
import { Google } from 'components/ui/Icons/Google';
import { Divider } from 'components/ui/Form/Divider/Divider';
import { styled } from 'styled-components';
import { AuthContainer } from './AuthContainer';
import { StyledLink } from 'components/ui/Form/StyledLink';
import { emailAddress, password } from './ZodStrings';
import { EmailField } from 'components/ui/Form/Input/EmailField/EmailField';
import { PasswordField } from 'components/ui/Form/Input/PasswordField';

// Define Zod Shape
const schema = z.object({
  password: password,
  emailAddress: emailAddress,
});

export const SignupPage = (): JSX.Element => {
  const title = 'Sign-Up';

  const { authSignUp, authSignInWithRedirect, isLoading, error } = useAuth();

  type FormValues = z.infer<typeof schema>;
  type keys = keyof FormValues;
  const defaultFormValues: FormValues = useMemo(
    () => ({
      emailAddress: '',
      password: '',
    }),
    [],
  );
  const { formValues, setFormValues, errors, setErrors } =
    useForm<FormValues>(defaultFormValues);

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
          await authSignUp(formValues.emailAddress, formValues.password);
        } catch (error) {
          // Handle sign-up error
        }
      }
    },
    [validateForm, authSignUp, formValues],
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

  const handleClick = (provider: SocialProvider) => {
    authSignInWithRedirect(provider);
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
        title="Sign Up">
        <Button2
          icon={<Amazon ariaHidden focusable={false} />}
          id="login"
          marginBottom="15px"
          onClick={() => handleClick(SocialProvider.AMAZON)}
          type="button">
          Sign up with Amazon
        </Button2>
        <Button2
          icon={<Facebook ariaHidden focusable={false} />}
          id="login"
          marginBottom="15px"
          onClick={() => handleClick(SocialProvider.FACEBOOK)}
          type="button">
          Sign up with Facebook
        </Button2>
        <Button2
          icon={<Google ariaHidden focusable={false} />}
          id="login"
          marginBottom="15px"
          onClick={() => handleClick(SocialProvider.GOOGLE)}
          type="button">
          Sign up with Google
        </Button2>
        <Divider>or</Divider>
        <StyledForm
          noValidate
          // aria-errormessage={error ? 'error' : undefined}
          // aria-invalid={error ? 'true' : 'false'}
          // noValidate
          onSubmit={handleSubmit}>
          <EmailField
            autoComplete="email"
            errorTextShort="Please enter an email address"
            inputMode="email"
            label="Email Address"
            multiple={false}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            spellCheck="false"
            type="email"
            {...getStandardTextInputAttributes('emailAddress')}
          />
          <PasswordField
            autoComplete="new-password"
            errorTextShort="Please enter a password"
            helpText={['8 characters minimum']}
            inputMode="text"
            label="Password"
            maxLength={60}
            onChange={handleChange}
            placeholder="Enter your password"
            required
            showCounter
            type="password"
            {...getStandardTextInputAttributes('password')}
          />
          <InstDiv>
            You will be sent a validation code via email to confirm your
            account.
          </InstDiv>
          <Button2 id="login" type="submit" variant="secondary">
            {isLoading ? 'Processing' : 'Submit'}
          </Button2>
        </StyledForm>
        <TermsDiv>
          By clicking &quot;Submit&quot; you are agreeing to the{' '}
          <StyledLink to="/terms-of-use">Terms of Use</StyledLink>,{' '}
          <StyledLink to="/privacy-policy">Privacy Policy</StyledLink>, and{' '}
          <StyledLink to="/cookie-use">Cookie Use Policy</StyledLink> of this
          site.
        </TermsDiv>
        <StyledBottomMsg>
          Already have an account? <StyledLink to="/signin">Sign in</StyledLink>
        </StyledBottomMsg>
      </AuthContainer>
    </>
  );
};

export default SignupPage;

const StyledForm = styled.form`
  padding: 20px 0;
`;
const StyledBottomMsg = styled.div`
  padding: 20px 0;
  text-align: center;
`;
const TermsDiv = styled.div`
  padding: 16px 0;
  font-size: 0.7rem;
`;
const InstDiv = styled.div`
  padding: 16px 0;
  font-size: 0.9rem;
  text-wrap: pretty;
  text-align: center;
`;
